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
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin({port: 8081})
    ],
    devtool: 'source-map'
}