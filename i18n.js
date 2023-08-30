const path = require('path')

module.exports = {

    defaultLocale: 'es',
    locales: ['es', 'en'],
    pages: {
        '*': ['common'],
    },

    localePath: path.resolve('./public/locales/es/common.json')

};