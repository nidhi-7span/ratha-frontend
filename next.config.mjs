/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "directus-8b8q.onrender.com",
      },
    ],
  },
};

export default nextConfig;