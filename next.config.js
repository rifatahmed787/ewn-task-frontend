/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized:true,
    domains: [
      "res.cloudinary.com",
      "f8g8b9p5.rocketcdn.me",
      "ninetheme.com",
      "dummyimage.com",
      "lh3.googleusercontent.com"
    ],
  },
};

module.exports = nextConfig;
