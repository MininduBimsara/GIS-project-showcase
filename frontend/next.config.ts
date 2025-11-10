import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Allow backend-served uploaded images in development (any port on localhost)
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      // Allow backend-served uploaded images in production on Vercel
      {
        protocol: "https",
        hostname: "gis-project-showcase-9ujw.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
