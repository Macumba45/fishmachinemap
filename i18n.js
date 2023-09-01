console.log('cargo el i18n.js')
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
    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./public/locales/${lang}/${ns}.json`).then(m => m.default) ||
        {},
}
