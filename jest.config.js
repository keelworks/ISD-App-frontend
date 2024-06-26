// https://jestjs.io/docs/en/configuration.html

export default {
  moduleFileExtensions: ["js", "json", "jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/imageMock.js",
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS/SCSS imports
  },
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  transformIgnorePatterns: ["/node_modules/", "^.+\\.css$"],
  preset: "./jest-preset.json",
  transform: { "^.+\\.[tj]sx?$": ["babel-jest"], "^.+\\.js$": "esbuild-jest" },
  setupFilesAfterEnv: ["esm"],
  testEnvironment: "jsdom",
};
