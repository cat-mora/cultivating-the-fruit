/* @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require("expo/metro-config");

let config = getDefaultConfig(__dirname);

// Add custom transformer to handle import.meta for web
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("./metro-transformer.js"),
};

module.exports = config;
