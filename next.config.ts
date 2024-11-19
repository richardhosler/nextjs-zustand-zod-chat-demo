import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xsgames.co",
        pathname: "/randomusers/avatar.php*",
      },
    ],
  },
};

export default nextConfig;
