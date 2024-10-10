/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"],
    remotePatterns: [
      {
        hostname: "picsum.photos",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
