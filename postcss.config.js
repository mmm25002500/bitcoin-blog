module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './src/pages/**/*.{js,ts,jsx,tsx}',
              './src/components/**/*.{js,ts,jsx,tsx}',
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: [
                /^swiper/,
                /^dark/,
                /^drawer/,
                /^card/,
                /^bg-/,
                /^text-/,
                /^border-/,
                /^prose/,
                /^mt-/,
                /^mb-/,
                /^ml-/,
                /^mr-/,
                /^mx-/,
                /^my-/,
                /^p-/,
                /^pt-/,
                /^pb-/,
                /^pl-/,
                /^pr-/,
                /^px-/,
                /^py-/,
              ],
              deep: [/drawer/, /card/, /swiper/],
            },
          },
        }
      : {}),
  },
}
