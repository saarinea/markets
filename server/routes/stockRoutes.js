const requireLogin = require('../middlewares/requireLogin.js')
const axios = require('axios')

module.exports = app => {
  app.get('/data/stocks', async (req, res) => {
    try {
      const result = await axios.get(
        'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo'
      )
      res.send(result.data)
    } catch (error) {
      console.log(error)
    }
  })
}
