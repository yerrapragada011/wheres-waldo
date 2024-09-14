const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { getCharacters, submitScore, leaderboardList } = require('./controller')

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use(
  cors({
    origin: 'https://wheres-waldo-mu.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers'
    ]
  })
)

app.use((req, res, next) => {
  console.log(req.headers)
  next()
})

app.get('/api/characters', getCharacters)
app.post('/api/submit-score', submitScore)
app.get('/api/leaderboard', leaderboardList)

const PORT = process.env.PORT || 8000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
