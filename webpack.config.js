const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = (env === 'production');
  const CSSExtract = new ExtractTextPlugin('styles.css');
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'public', 'calculator', 'dist'),
      filename: 'bundle.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        },
        {
          test: /\.css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  camelCase: true,
                  importLoaders: 1,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: true },
              },
            ],
          }),
        },
        {
          test: /\.(jpe?g|png|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images',
            publicPath: path.join('/', 'calculator', 'dist', 'images'),
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
          },
        },
      ],
    },
    plugins: [CSSExtract],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public', 'calculator'),
      historyApiFallback: true,
      publicPath: '/calculator/dist/',
    },
  };
};
