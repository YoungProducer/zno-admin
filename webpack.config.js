const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      routes: path.resolve(__dirname, 'src/routes'),
      store: path.join(__dirname, 'src/store'),
      public: path.resolve(__dirname, 'public'),
      types: path.resolve(__dirname, 'src/types'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: [{ 
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader?name=fonts/[name].[ext]",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CopyPlugin([
      {
        from: './public/images',
        to: './img/[name].[ext]',
        toType: 'template'
      }
    ])
  ]
};
