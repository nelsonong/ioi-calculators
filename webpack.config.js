const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        camelCase: true,
                        importLoaders: 1,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                },
                'postcss-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|png)$/,
            loader: 'file-loader'
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};