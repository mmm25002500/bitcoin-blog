/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
  return [
    {
      source: '/Post/All',
      destination: `/Post/All/default`, // 默认标签路径
      permanent: false,
    },
    {
      source: '/News/All',
      destination: `/News/All/default`, // 默认标签路径
      permanent: false,
    },
  ];
},

  reactStrictMode: true,
}

module.exports = nextConfig
