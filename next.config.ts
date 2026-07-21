// next.config.js
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jjqlijvhckdbdrcwstwg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withSerwist(nextConfig);
