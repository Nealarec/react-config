const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const fs = require('fs-extra')

// var CopyWebpackPlugin = require('copy-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = {
  source: path.join(__dirname, 'src'),
  distry: path.join(__dirname, 'build'),
  assets: path.join(__dirname, 'assets')
}

fs.emptyDirSync(paths.distry)

var config = {
  entry: {
    'bundle': paths.source + '/main.js',
    'style': paths.source + '/sass/base.scss'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-decorators-legacy', 'transform-object-rest-spread'],
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'ruby-sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        }
      }
    }, {
      test: /\.(jpg|png|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }
    }]
  },
  resolve: {
    modules: ['src', 'node_modules'],
  }
}
if (process.env.NODE_ENV === 'production') {
  config = merge(config, {
    output: {
      path: paths.distry,
      filename: '[name].[hash].js',
      publicPath: '/'
    }
  })
} else {
  config = merge(config, {
    devServer: {
      contentBase: paths.distry,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },

    output: {
      path: paths.distry,
      filename: '[name].js',
      publicPath: '/'
    }

  })
}

if (process.env.HOT) {
  config = merge(config, {
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

module.exports = config
