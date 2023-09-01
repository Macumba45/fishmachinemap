// webpack.config.js

const webpack = require('webpack')

module.exports = {
    // Configuraciones de tu proyecto Webpack

    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
        }),
    ],
    devtool: false,
}
