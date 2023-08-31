module.exports = {
    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./src/components/locales/${lang}/${ns}.json`).then((m) => m.default),
    locales: ['es', 'en'],
    defaultLocale: 'es',
    pages: {
        "*": ['common'],
        "/": ['common'],
        "/maps": ['common'],
    },


}



