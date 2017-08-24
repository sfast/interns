'use strict';
var path = require('path');

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// ** dist and src folder names
var distFolder = 'dist';
var srcFolder = 'src';

// ** dist and src folder paths
var srcPath = path.resolve(__dirname + '/' + srcFolder);
var buildPath = path.resolve(__dirname + '/' + distFolder);
var phaserModulePath = path.resolve(__dirname + '/node_modules/phaser');

module.exports = function makeWebpackConfig() {
    var config = {
        target: 'web',
        resolve: {
            alias: {
                'phaser': path.join(phaserModulePath, 'build/custom/phaser-split.js'),
                'pixi': path.join(phaserModulePath, 'build/custom/pixi.js'),
                'p2': path.join(phaserModulePath, 'build/custom/p2.js')
            }
        },
        context: path.resolve(__dirname),
        entry:  {
            vendor: ['p2', 'pixi', 'phaser'],
            app : [path.resolve(__dirname + '/src/index.js')]
        },
        output: {
            path: buildPath,
            filename: '[name].[hash].js'
        }
    };

    config.devtool = 'eval-source-map';




    // Initialize module
    config.module = {
        rules: [ { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] },
            {
                // JS LOADER
                // Reference: https://github.com/babel/babel-loader
                // Transpile .js files using babel-loader
                // Compiles ES6 and ES7 into ES5 code
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/, /pixi\.js/, /phaser-split\.js/, /p2\.js/]
            }, {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js
                //
                // Reference: https://github.com/postcss/postcss-loader
                // Postprocess your css with PostCSS plugins
                test: /\.css$/,
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                // Extract css files in production builds
                //
                // Reference: https://github.com/webpack/style-loader
                // Use style-loader in development.

                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'}
                    ],
                })
            }, /*{
             // ASSET LOADER
             // Reference: https://github.com/webpack/file-loader
             // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
             // Rename the file using the asset hash
             // Pass along the updated reference to your code
             // You can add here any file extension you want to get copied to your output
             test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
             use: "file-loader"
             }, */{
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                use: 'raw-loader'
            }]
    };


    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    // NOTE: This is now handled in the `postcss.config.js`
    //       webpack2 has some issues, making the config file necessary

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // new webpack.LoaderOptionsPlugin({
        //     test: /\.scss$/i,
        //     options: {
        //         postcss: {
        //             plugins: [autoprefixer]
        //         }
        //     }
        // })
    ];

    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + '/index.html'),
            inject: 'head'
        })

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // new ExtractTextPlugin({filename: 'css/[name].css', disable: true, allChunks: true})
    );

    // Add build specific plugins
    config.plugins.push(
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoEmitOnErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        // new webpack.optimize.DedupePlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        // new webpack.optimize.UglifyJsPlugin(),

        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname + '/src/assets'),
            to : path.resolve(buildPath + '/assets')
        }])
    );

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: path.resolve(__dirname, distFolder),
        compress: false,
        inline : true,
        stats: 'minimal',
        disableHostCheck: true
    };

    return config;
}();