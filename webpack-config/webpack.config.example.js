const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');
const example = (process.env.EXAMPLE || 'item-list').trim();
const TerserPlugin = require('terser-webpack-plugin');
const mode = (process.env.MODE || 'development').trim();
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        example: `./public/${example}.ts`
    },
    resolve: {
        extensions: ['.js', '.ts', '.css', '.scss', '...']
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: helpers.root(`examples/${example}`),
        publicPath: `/`,
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    optimization: {
        minimize: true,
        minimizer:
            mode === 'development'
                ? []
                : [
                      new TerserPlugin({
                          terserOptions: {
                              ecma: 6,
                              compress: {drop_console: true},
                              output: {comments: true}
                          }
                      })
                  ]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: helpers.root() + '/examples/' + example,
            cleanOnceBeforeBuildPatterns: ['*.js', '*.txt']
        }),
        // new MiniCssExtractPlugin({
        //     linkType: false,
        //     filename: '[name].[contenthash].css',
        //     chunkFilename: '[id].[contenthash].css'
        // }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, `../public/${example}.css`),
                to: path.resolve(__dirname, `../examples/${example}/${example}.css`)
            }
        ]),
        new FaviconsWebpackPlugin(`${helpers.root()}/src/favicon.ico`),
        new HtmlWebPackPlugin({
            inject: true,
            title: example,
            template: helpers.root() + `/public/${example}.html`,
            filename: helpers.root() + `/examples/${example}/index.html`
        })
    ]
};
