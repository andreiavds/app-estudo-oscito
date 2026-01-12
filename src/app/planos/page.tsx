"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Check, Crown, Zap } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    id: "semiannual",
    name: "Plano Semestral",
    price: 49.90,
    interval: "6 meses",
    description: "Acesso completo por 6 meses",
    features: [
      "Conteúdo completo OSCE",
      "Simulações interativas",
      "Banco de questões",
      "Monitoramento de progresso",
      "Suporte técnico",
      "Renovação automática",
    ],
    popular: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_SEMESTRAL_PRICE_ID,
  },
  {
    id: "annual",
    name: "Plano Anual",
    price: 89.90,
    interval: "12 meses",
    description: "Acesso completo por 1 ano com desconto",
    features: [
      "Tudo do plano semestral",
      "Relatórios avançados",
      "Certificado de conclusão",
      "Acesso offline",
      "Suporte prioritário",
      "Renovação automática",
    ],
    popular: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ANUAL_PRICE_ID,
  },
];

export default function PlanosPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubscribe = async (plan: typeof plans[0]) => {
    setLoading(plan.id);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe não carregado");
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          priceId: plan.stripePriceId,
          userId: user.id,
        },
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Erro ao criar checkout:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-green-900/30 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-green-500" />
              <h1 className="text-4xl font-bold text-green-400">OSCITO</h1>
            </div>
            <p className="text-green-600">Escolha seu plano de estudos</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Planos de Assinatura
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta aos seus estudos. Todos os planos incluem renovação automática para manter seu acesso contínuo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-green-950/30 border-green-900/30 ${
                plan.popular ? "ring-2 ring-green-500/50" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-black px-4 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl text-green-400">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-green-300">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-green-600">/{plan.interval}</span>
                </div>
                <CardDescription className="text-green-600 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-green-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading === plan.id}
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black"
                      : "bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-700"
                  }`}
                >
                  {loading === plan.id ? (
                    "Processando..."
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Assinar {plan.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-green-600 text-sm">
            Todos os planos incluem garantia de 7 dias. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}