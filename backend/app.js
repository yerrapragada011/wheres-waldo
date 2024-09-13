require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { getCharacters, submitScore, leaderboardList } = require('./controller')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(
  cors({
    origin: 'https://wheres-waldo-mu.vercel.app'
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://wheres-waldo-mu.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/api/characters', getCharacters)
app.post('/api/submit-score', submitScore)
app.get('/api/leaderboard', leaderboardList)

const PORT = process.env.PORT || 8000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
