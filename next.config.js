/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
  return [
    {
      source: '/Tag/News',
      destination: `/Tag/News/all`, // 默认标签路径
      permanent: false,
    },
    {
      source: '/Tag/Post',
      destination: `/Tag/Post/all`, // 默认标签路径
      permanent: false,
    },
    {
      source: '/Tag',
      destination: `/Tag/all`, // 默认标签路径
      permanent: false,
    },
  ];
},

  reactStrictMode: true,
}

module.exports = nextConfig
