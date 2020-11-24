const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  projectRoot: __dirname,
  // Target must be serverless
  target: "serverless",
  env: {
    IPFS: process.env.IPFS === "true" ? "true" : "false",
    POKT_PROJECT_ID: "5f8c0233b90218002e9cea39",
  },
});
