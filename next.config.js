/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
  return [
    {
      source: '/Tag/News',
      destination: `/Tag/News/all`,
      permanent: false,
    },
    {
      source: '/Tag/Post',
      destination: `/Tag/Post/all`,
      permanent: false,
    },
    {
      source: '/Tag',
      destination: `/Tag/all`,
      permanent: false,
    },
    {
      source: '/Search',
      destination: `/Search/Posters/標籤1`,
      permanent: false,
    },
    {
      source: '/Search/:path',
      destination: `/Search/Posters/:path`,
      permanent: false,
    },
    {
      source: '/Search/Posters',
      destination: `/Search/Posters/標籤1`,
      permanent: false,
    },
    {
      source: '/Search/News',
      destination: `/Search/News/文字1`,
      permanent: false,
    },
    {
      source: '/Search/Creators',
      destination: `/Search/Crators/%20`,
      permanent: false,
    },
  ];
},

  reactStrictMode: true,
}

module.exports = nextConfig
