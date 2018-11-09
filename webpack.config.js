var path = require('path');
var htmlWebpackPlugins = require('html-webpack-plugin');
module.exports = {
    entry: {
        index:'./src/app/controller/index.ts',
        cart: './src/app/controller/cart.ts'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js'
    },
    module:{
        rules:[
            //dong goi css
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
            },
            //dong goi html
            {
                test: /\.html$/,
                use:['html-loader'],
            },
            //dong goi hinh anh
            {
                test: /\.(png|jpg|svg)$/,
                use:[{
                    loader: "file-loader",
                    options: {
                        limit: 10000,
                        name: '[name].[ext]',
                        outputPath: "img/",
                        publicPath: "img/"
                    }
                }]
            },
            //dong goi scss
            {
                test:/\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            //dong goi typescript
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    resolve:{
        extensions: ['.ts', '.js']
    },
    plugins:[
        new htmlWebpackPlugins({
            filename: 'index.html',
            template:'./src/app/Views/index.html',
            chunks:['index']
        }),
        new htmlWebpackPlugins({
            filename:'cart.html',
            template:'./src/app/Views/cart.html',
            chunks:['cart']
        })
    ],
    devServer:{
        contentBase:'./dist'
    }
}

