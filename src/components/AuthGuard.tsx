"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Check if device matches
      const storedDeviceId = localStorage.getItem("device_id");
      const userDeviceId = user.user_metadata?.device_id;

      if (storedDeviceId && userDeviceId && storedDeviceId !== userDeviceId) {
        // Different device, sign out
        await supabase.auth.signOut();
        localStorage.removeItem("device_id");
        router.push("/auth/login?error=device");
        return;
      }

      setAuthenticated(true);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          setAuthenticated(false);
          router.push("/auth/login");
        } else if (event === "SIGNED_IN") {
          setAuthenticated(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-green-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}