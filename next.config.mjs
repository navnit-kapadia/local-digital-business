/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Keep path alias @/ -> src (see tsconfig paths)
  transpilePackages: [],
};

export default nextConfig;
