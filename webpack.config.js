const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    resolve: {
        alias : {
            page        : path.resolve(__dirname, 'src/page'),
            component   : path.resolve(__dirname, 'src/component'),
            util        : path.resolve(__dirname, 'src/util'),
            service     : path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                        loader: 'css-loader',
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }, 
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                  ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        },
                    },
                ],
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]',
                        },
                    },
                ],
            }, 
        ]
    },
    plugins: [
        //operate html file
        new HTMLWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        //extract css file
        new ExtractTextPlugin("css/[name].css"),
        //extract public module
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port: 8086,
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy : {
            '/manage' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            },
            '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }
    }
};