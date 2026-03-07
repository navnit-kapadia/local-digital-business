/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Keep path alias @/ -> src (see tsconfig paths)
  transpilePackages: [],
};

export default nextConfig;
