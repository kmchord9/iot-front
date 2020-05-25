const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Dotenv = require('dotenv-webpack')


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'bundle.js'
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.vue', '*'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'src/api')
    ]
  },
  performance: {

  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv()
  ]
}