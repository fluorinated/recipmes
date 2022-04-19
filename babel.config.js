module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@constants": "./src/constants",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/components/screens",
            "@rec": "./src/components/rec",
            "@hooks": "./src/hooks",
            "@models": "./src/models",
            "@utils": "./src/utils",
            "@store": "./src/store",
          },
        },
      ],
    ],
  };
};
