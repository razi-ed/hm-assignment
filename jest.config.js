const path = require("path");

const config = {
  roots: [path.resolve(__dirname, "../src")],
  displayName: "hm",
  testMatch: ["**/**/*.test.js"],
  //   testURL: "http://localhost",
  setupFilesAfterEnv: [path.resolve(__dirname, "../src/config/testSetup.js")]
};

module.exports = {
  projects: [config]
};
