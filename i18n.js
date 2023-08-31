module.exports = {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    pages: {
        "*": ['common'],
        "/": ['common'],
        "/maps": ['common'],
    },
    "loadLocaleFrom": (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./pages/locales/${lang}/${ns}.json`).then((m) => m.default),
};