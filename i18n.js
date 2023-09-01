module.exports = {
  experimental: {
    appDir: true,
  },
  pagesInDir: './src/app',
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pages: {
    '*': ['common'],
    '/': ['common'],
    '/maps': ['common'],
  },
  localeRoot: './locales/',
  defaultNS: 'common',
  localeDetection: false,


}
