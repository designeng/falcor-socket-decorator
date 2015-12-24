var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: __dirname + '/example/index.js',
    output: {
        filename: './public/build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                // exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "source"),
                    path.resolve(__dirname, "example")
                ]
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin({port: 8081})
    ],
    devtool: 'source-map'
}