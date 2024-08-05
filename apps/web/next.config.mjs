import { fileURLToPath } from "url";
import createJiti from "jiti";

// import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  /** enables hot reloading for local packages without a build step */
  transpilePackages: [
    '@skohr/api',
    '@skohr/auth',
    '@skohr/db',
    '@skohr/ui',
    '@skohr/utils'
  ],
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default config;
