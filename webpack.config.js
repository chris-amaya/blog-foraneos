var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
/* require("@babel/core").transform("code", {
    plugins: ["@babel/plugin-syntax-dynamic-import"],
  }); */

module.exports = {
    entry: {
        index: './src/js/index.js',
        recetas: './src/js/recetas.js',
        login: ['babel-polyfill', './src/js/login.js', './src/assets/css/loginComponents.scss'],
        registro: ['babel-polyfill', './src/js/registro.js', './src/assets/css/registroComponents.scss'],
        loginHandler: './src/js/login.handler.js',
    },
    output: {
        path: __dirname,
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },

    // plugins: [
    //     // buscar como remplazar esta librería
    //     /* new webpack.optimize.UglifyJsPlugin(), */ // Librería que servía para ofuscar código y minificarlo
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html', /* cambiar a dist/index.html */
    //         template: './src/index.html',
    //         chunks: ['index']
    //     }),
    //     new HtmlWebpackPlugin({
    //         filename: 'recetas.html',
    //         template: './src/recetas.html',
    //         chunks: ['recetas']
    //     })
    // ],
    
    devServer: {
        port: 6000
    },
    module: {
        rules: [
            // { test: /\.m?js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'], plugins: ['@babel/plugin-syntax-dynamic-import'/* , '@babel/plugin-transform-runtime' */] } } },
            { test: /\.css$/, use: ['style-loader', 'css-loader'], },
            { test: /\.hbs$/, loader: "handlebars-loader" },
            { test: /\.scss$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].css',
                    },
                  },
                  { loader: 'extract-loader' },
                  { loader: 'css-loader' },
                  {
                    loader: 'postcss-loader',
                    options: {
                       plugins: () => [autoprefixer()]
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      includePaths: ['./node_modules']
                    }
                  }
                ]},
                {
                  test: /\.js$/,
                  loader: 'babel-loader',
                  query: {
                    presets: ['@babel/preset-env'],
                  },
              }
        ]
    },

    devtool: 'eval-source-map'
};