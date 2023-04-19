/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // output: "standalone",
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
  images: {
    domains: ["image.tmdb.org", "www.themoviedb.org"],
  },
};
export default nextConfig;
