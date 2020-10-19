module.exports = {
  // Target must be serverless
  target: "serverless",
  env: {
    IPFS: process.env.IPFS === "true" ? "true" : "false",
    COMMIT_SHA:
      process.env.VERCEL_GITHUB_COMMIT_SHA ||
      process.env.GITHUB_SHA ||
      "master",
    POKT_PROJECT_ID: "5f8c0233b90218002e9cea39",
  },
};
