/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  /** enables hot reloading for local packages without a build step */
  transpilePackages: ['@skohr/api', '@skohr/auth', '@skohr/db', '@skohr/ui'],
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default config;
