export default async function handler(req, res) {
  return fetch('https://api.wazirx.com/api/v2/tickers')
    .then(result => result.json().catch(e => console.log(e)))
    .then(result => res.status(200).json(result))
    .catch(e => console.error(e));
}
