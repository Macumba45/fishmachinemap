module.exports = {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    localeDetection: true,
    pages: {
        '*': ['common'],
        // '/': ['home'], // app/page.tsx
        // '/checkout': ['checkout'], // app/checkout/page.tsx
    },
    loadLocaleFrom: (lang, ns) =>
        import(`./locales/${ns}/${lang}.json`).then(m => m.default),
}