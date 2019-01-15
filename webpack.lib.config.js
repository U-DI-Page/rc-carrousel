// const MinCssExtratPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports={
  mode: 'production',
  entry: path.resolve(__dirname, 'src/components/index.js'),
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2' //注意：记得设置commonjs2
  },
  module : {
    rules : [
      {
        test:/\.(sc|c|sa)ss$/,
        use:[
          "style-loader", {
            loader : 'css-loader',
            options : {
              sourceMap : true,
              modules:true,
            }
          },  {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              // modules:true,
              plugins: (loader) => [require('autoprefixer')({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              modules:true,
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
            cacheDirectory:true
          }
        }
      }, {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, 'src')],
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
    new CleanWebpackPlugin(['lib'],{
      // root : '', // 根路径
      verbose : true, // 开启控制台输出信息
      dry : false // 启用删除文件
    })
  ]

}