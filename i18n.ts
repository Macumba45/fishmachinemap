module.exports = {
    locales: ['es', 'en'],
    pages: {
        "*": ['common'],
        "/": ['common'],
        "/maps": ['common'],
    },
    domains: [
        {
            domain: 'https://fishgramapp.vercel.app/',
            defaultLocale: 'en',
        },
    ],

    loadLocaleFrom: (lang: any, ns: any) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./src/components/locales/${lang}/${ns}.json`).then((m) => m.default),
}



