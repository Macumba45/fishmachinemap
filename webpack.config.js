// webpack.config.js

const webpack = require('webpack')

module.exports = {
    // Configuraciones de tu proyecto Webpack

    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
        }),
    ],
    i18nConfig: {
        locales: ['es', 'en'],
        defaultLocale: 'es',
        pages: {
            "*": ['common'],
            "/": ['common'],
            "/maps": ['common'],
        },
        loadLocaleFrom: (lang, ns) =>
            // You can use a dynamic import, fetch, whatever. You should
            // return a Promise with the JSON file.
            import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default)
    }

}
