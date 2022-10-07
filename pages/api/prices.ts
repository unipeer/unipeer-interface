import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  return fetch("https://api.wazirx.com/api/v2/tickers")
    .then((result) => result.json().catch((e) => console.log(e)))
    .then((result) => res.status(200).json(result))
    .catch((e) => console.error(e));
}
