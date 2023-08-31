module.exports = {
    locales: ['es', 'en'],
    pages: {
        "*": ['common'],
        "/": ['common'],
        "/maps": ['common'],
    },
    domains: [
        {
            domain: 'localhost:3000/es',
            defaultLocale: 'en',
        },
        {
            domain: 'localhost',
            defaultLocale: 'en',
        },
    ],

    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        console.log(`./src/components/locales/${lang}/${ns}.json`) ||
        import(`./src/components/locales/${lang}/${ns}.json`).then((m) => m.default),


};  