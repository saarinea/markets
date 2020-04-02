const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys.js')
const cors = require('cors')
require('./models/User.js')
require('./services/passport.js')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes.js')(app)
require('./routes/stockRoutes.js')(app)

// Production / development settings
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
else {
    app.use(
      cors({
        origin: 'http://localhost:3000'
      })
    )
}


const PORT = process.env.PORT || 5000
app.listen(PORT)
