import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE:
  // Avoid forcing Turbopack's root on Windows. This has been observed to cause
  // intermittent "Next.js package not found" Turbopack panics in some setups.
};

export default nextConfig;
