import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BETTER_AUTH_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://budget-app-finance.vercel.app'
        : 'http://localhost:3000',
  },
};

export default nextConfig;
