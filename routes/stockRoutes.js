const requireLogin = require('../middlewares/requireLogin.js')
const axios = require('axios')
const keys = require('../config/keys.js')

module.exports = app => {
  app.get('/data/stocks', async (req, res) => {
    try {
      const result = await axios.get(
        'https://www.alphavantage.co/query',
        {params:{
          function:"TIME_SERIES_DAILY",
          symbol: req.query.ticker,
          apikey: keys.AlphaVantageKey
        }}
      )
      res.send(result.data)
    } catch (error) {
      console.log(error)
    }
  })
}
