const path = require("path");
module.exports = {
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../static/js"),
  },
  module: {
    rules: [
      { exclude: [path.resolve(__dirname, "node_modules/"), /\node_modules$/], test: /\.(ts|tsx)$/, use: "ts-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
