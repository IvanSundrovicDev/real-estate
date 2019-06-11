const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[hash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    // mode: 'production',
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "./images/[name].[hash].[ext]",
                        }

                    }
                ]

            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
              test: /\.scss$/,
              use: extractSass.extract({
                use: [
                  {
                    loader: "css-loader",
                    options: {
                      minimize: true,
                      // sourceMap: true
                    }
                  },
                  {
                    loader: "sass-loader"
                  }],
                  // use style-loader in development
                  fallback: "style-loader"
                })
              }

        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        extractSass,
        // new ExtractTextPlugin('[name].[hash].css'),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
};
