const lang = "es";
module.exports = {
    locales: ['es, en'],
    defaultLocale: lang,
    localeDetection: false,
    trailingSlash: true,
    pages: {
        "*": ["common"],
        "/": ["common"],
        "/maps": ["common"],

    },
    loadLocaleFrom: (lang, ns) =>
        console.log(lang, ns) ||
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};