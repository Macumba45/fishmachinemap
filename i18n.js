module.exports = {
  experimental: {
    appDir: true,
  },
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pages: {
    '*': ['common'],
    '/': ['common'],
    '/maps': ['common'],
  },
  loadLocaleFrom: async (locale, namespace) => {
    console.log(namespace, locale)
    return import(`./locales/${locale}/${namespace}.json`).then((m) => m.default)
  }

}
