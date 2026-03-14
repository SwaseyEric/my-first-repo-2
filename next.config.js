/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow GLSL/shader imports as strings
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
