const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    const chartName = (env && env.chart) ? env.chart : 'spider';
    const isDev = process.env.NODE_ENV === 'development';

    console.log('Building chart:', chartName);
    console.log('Environment:', env);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    return {
        mode: isDev ? 'development' : 'production',
        entry: {
            [chartName]: `./public/charts/${chartName}/index.ts`
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].js',
            clean: true,
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                sourceMap: true,
                                module: 'esnext',
                                moduleResolution: 'node'
                            }
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: [
                'node_modules',
                path.resolve(__dirname, '../src')
            ]
        },
        optimization: {
            minimize: !isDev,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: !isDev,
                        },
                    },
                }),
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        performance: {
            hints: isDev ? false : 'warning',
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `../public/charts/${chartName}/index.html`),
                filename: 'index.html',
                chunks: [chartName]
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, '../dist')
            },
            compress: true,
            port: 9000,
            hot: true,
            open: true,
            historyApiFallback: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false
                }
            }
        },
        stats: {
            errorDetails: true
        }
    };
};
