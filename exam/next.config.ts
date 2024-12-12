import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
};

module.exports = {
  reactStrictMode: false,
};

export default nextConfig;
