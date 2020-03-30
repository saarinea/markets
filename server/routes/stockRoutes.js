const requireLogin = require('../middlewares/requireLogin.js')

module.exports = app => {
  app.get("/data/stocks", (req, res) => {
    fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo")
    .then(res => res.json())
    .then(data => res.send({data}))
    .catch(error => console.log(error))
  })
};