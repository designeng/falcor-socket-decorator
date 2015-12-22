var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
      './../../../node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests.bundle.js'
    ],

    frameworks: [ 'chai', 'mocha' ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-osx-reporter',
      'karma-mocha-reporter'
    ],

    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      './tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'osx', 'mocha' ],

    singleRun: false,

    // webpack config object
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            loader: 'babel',
            test: /\.js?$/,
            query: {
              presets: ['es2015', 'stage-0'],
              plugins: [
                ['transform-decorators-legacy']
              ]
            }
          }
        ],
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin()
      ]
    }

  });
};