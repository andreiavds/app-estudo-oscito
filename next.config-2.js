/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desabilita Turbopack explicitamente - força uso do Webpack
  turbo: undefined,
  
  // Configurações para garantir estabilidade
  reactStrictMode: true,
  
  // Otimizações de build
  swcMinify: true,
  
  // Configuração de imagens (se necessário)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Configuração experimental (se necessário)
  experimental: {
    // Garante que não use Turbopack
    turbo: undefined,
  },
};

module.exports = nextConfig;
