const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const InlineSourcePlugin = require("html-webpack-inline-source-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode !== "development";

  const paths = {
    styles: path.resolve(__dirname, "src/styles"),
    images: path.resolve(__dirname, "src/images"),
    scripts: path.resolve(__dirname, "src/scripts"),
    components: path.resolve(__dirname, "src/scripts/components"),
    sounds: path.resolve(__dirname, "src/sounds"),
  };

  return {
    entry: "./src/scripts/index.js",
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths.styles,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                minimize: isProd,
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.mp3$/,
          use: {
            loader: "file-loader",
            options: {
              name: "sounds/[name].[ext]",
            },
          },
          include: paths.sounds,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: paths.scripts,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["> 5% in US"],
                    },
                    modules: false,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      alias: {
        "@styles": paths.styles,
        "@images": paths.images,
        "@scripts": paths.scripts,
        "@components": paths.components,
        "@sounds": paths.sounds,
      },
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        inject: true,
        inlineSource: "runtime~.+\\.js|.css",
      }),
      new InlineSourcePlugin(),
      new ScriptExtHtmlWebpackPlugin({
        async: ["vendor", "main"],
      }),
      new ProgressBarPlugin({
        format:
          "\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m",
        renderThrottle: 100,
      }),
      new ManifestPlugin(),
      new MiniCssExtractPlugin({
        filename: isProd
          ? "style/[name].[contenthash].css"
          : "style/[name].css",
        chunkFilename: isProd
          ? "style/[id].[contenthash].css"
          : "style/[id].css",
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: true,
      hashedModuleIds: isProd,
    },
    devtool: isProd ? false : "eval-source-map",
    output: {
      filename: `scripts/[name].${isProd ? "[chunkhash].js" : "js"}`,
      path: path.resolve(__dirname, "dist"),
    },
  };
};
