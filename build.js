const fs = require("fs");
const { promisify } = require('util')
const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const readdir = promisify(fs.readdir)

async function build() {
  webpack({
    mode: 'none',
    entry: (await readdir("pages")).map(file => './pages/' + file),
    output: {
      path: path.join(process.cwd(), 'dist')
    },
    module: {
      rules: [
        {
          test: /\.md/,
          use: ExtractTextPlugin.extract({ use: ['html-loader', 'gatz/loader'] })
        },
        {
          test: /\.css/,
          use: [
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: [
            { loader: 'file-loader' }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].html')
    ]
  }, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if (stats.compilation.errors.length) {
      console.error(stats.compilation.errors)
      return;
    }
  })
}

build();
