const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PORT = 9000;

module.exports={
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer:{
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    clientLogLevel: "none",
    // noInfo: true, // 启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏
    open: true,
    quiet:true, // 控制台不输出信息启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
    overlay:true, // 全屏报错
    port: PORT
  },
  devtool: 'inline-source-map',
  module : {
    rules : [
      {
        test:/\.(sc|c|sa)ss$/,
        use:[
          'style-loader', {
            loader : 'css-loader',
            options : {
              sourceMap : true,
              modules: true,
            }
          },  {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [require('autoprefixer')({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              modules: true,
            }
          }
        ]
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include:[path.resolve(__dirname, 'src')],
        use:{
          loader:'babel-loader',
          options:{
            cacheDirectory: true,
            sourceMap: true
          }
        }
      }, {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [ path.resolve(__dirname, 'src') ],
        use: [
          {
            // 将图片转为base64
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }, {
            // 图片优化
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins:[

    new HtmlWebpackPlugin({
      filename:'index.html',
      title:'React 旋转木马轮播图组件',
      template:path.resolve(__dirname, 'src/index.html')
    }),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: './static/'
    }]),
    
    // new OpenWebpackPlugin({
    //   url: `http://localhost:${ PORT }`
    // }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]

}