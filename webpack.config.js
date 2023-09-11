// webpack.config.js

const webpack = require('webpack')

module.exports = {
    // Configuraciones de tu proyecto Webpack

    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/pdf/', // Cambia la ruta de salida según tus necesidades
                        },
                    },
                ],
            },
        ],
    },
}
