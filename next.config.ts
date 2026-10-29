import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Origen de Supabase (API REST/Auth/Storage + Realtime por WebSocket).
// Si la variable aún no existe, se permite cualquier proyecto *.supabase.co.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHttp = supabaseUrl ? new URL(supabaseUrl).origin : "https://*.supabase.co";
const supabaseWs = supabaseHttp.replace(/^https:/, "wss:");

// CSP sin nonces (guía oficial: node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md)
// - img-src https: → las agencias pueden pegar URLs de imágenes de cualquier host HTTPS.
// - frame-src → solo Google Maps (TrustGuaranteeAndOffice).
// - frame-ancestors 'self' → el editor puede previsualizar /p/[slug]?embed=true; nadie externo puede enmarcarnos.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' blob: data: https:;
  connect-src 'self' ${supabaseHttp} ${supabaseWs};
  frame-src 'self' https://maps.google.com https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
      {
        // Supabase Storage (bucket público landing-assets)
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
