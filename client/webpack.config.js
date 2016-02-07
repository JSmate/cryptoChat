var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    context: __dirname + '/app',
    entry: './modules/app.js',
    output: {
        path: PATHS.build,
        //publicPath: '/',
        filename: 'assets/js/bundle.js',
        pathinfo: true
    },

    debug: true,
    devtool: 'inline-source-map',

    devServer: {
        contentBase: PATHS.build,

        inline: true,
        progress: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env so this is easy to customize.
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || '8080',

        proxy: {
            '/socket.io*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },

    plugins: [
        new Clean([PATHS.build]),
        new ExtractTextPlugin('assets/css/styles.css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            '__ENV__': {
                DEV: JSON.stringify(process.env.NODE_ENV === 'development'),
                PROD: JSON.stringify(process.env.NODE_ENV === 'production')
            }
        })
    ],

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },


    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'ng-annotate!babel!jshint'
        }, {
            test: /\.html$/,
            loader: 'ngtemplate?relativeTo=' + __dirname + '/app' + '!html'
        }, {
            test: /\.css$/,
            loader: 'style!css?sourceMap'
        }, {
            test: /\.scss$/,
            exclude: /(node_modules)/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap', {
                publicPath: '../../'
            })
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            //exclude: /(node_modules)/,
            loader: 'url?limit=10000&name=assets/img/[name]-[hash].[ext]'
        }, {
            test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)$/,
            //exclude: /(node_modules)/,
            loader: 'url?limit=10000&name=assets/fonts/[name].[ext]'
        }]
    },

    jshint: {
        emitErrors: true,
        failOnHint: true
    }
};