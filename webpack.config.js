const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientConfig = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/client/index.tsx",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      "icon-192x192": "./public/icon-192x192.png",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.client.json",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.png$/,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public/js"),
  },
};

module.exports = [clientConfig];
