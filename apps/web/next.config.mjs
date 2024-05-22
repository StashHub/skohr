/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [{
      hostname: 'avatars.githubusercontent.com'
    }]
  }
};

export default config;