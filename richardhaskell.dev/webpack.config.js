const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
let devMode = true;
module.exports = {
    mode: 'development',

    entry: {
        main: path.resolve(__dirname, 'src/index.js')
        //multiple names like main can go here for code splitting
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js', //allows for multiple names in code spliting
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5500',
                router: () => 'http://localhost:8080',
                logLevel: 'debug' /*optional*/
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin,
        new HtmlWebpackPlugin({
            title: 'Create Category',
            filename: 'index.html',
            template: 'src/template.html',
            inject: 'body'
        }) ,
        new FaviconsWebpackPlugin('./src/assets/futureSelfUrlLogo32.png')

    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //{ test: /\.ico$/, options: 'loader?name=[name].[ext]' },  // <-- retain original file name
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },


}