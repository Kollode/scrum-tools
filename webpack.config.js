const path = require("path");

module.exports = {
  entry: {
    client: "./src/client.tsx",
    vendor: ["react", "react-dom", "socket.io-client"]
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      }
    ]
  }
};
