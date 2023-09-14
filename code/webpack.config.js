const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    "content": "./src/index.tsx"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "extension"),
  },
  plugins: [
    new Dotenv({
      path: ".env.production",
    })
  ],    
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
};
