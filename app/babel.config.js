module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: process.env.EXPO_OS !== "web" ? "nativewind" : undefined,
        },
      ],
      ...(process.env.EXPO_OS !== "web" ? ["nativewind/babel"] : []),
    ],
  };
};
