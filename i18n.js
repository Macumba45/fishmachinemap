module.exports = {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    pages: {
        "*": ['common'],
        "/": ['common'],
        "/maps": ['common'],
    },

    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./src/components/locales/${lang}/${ns}.json`).then((m) => m.default),


};  