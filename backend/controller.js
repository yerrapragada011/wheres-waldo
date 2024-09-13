const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getCharacters = async (req, res) => {
  try {
    const characters = await prisma.character.findMany()
    res.json(characters)
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
}

const submitScore = async (req, res) => {
  const { username, score } = req.body

  try {
    const user = await prisma.user.upsert({
      where: { username },
      update: { score },
      create: { username, score }
    })
    res.status(200).json({ message: 'Score submitted', user })
  } catch (error) {
    console.error('Error submitting score:', error)
    res.status(500).json({ error: 'Error submitting score' })
  }
}

const leaderboardList = async (req, res) => {
  try {
    const leaderboard = await prisma.user.findMany({
      orderBy: {
        score: 'asc'
      },
      take: 10
    })
    res.json(leaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    res.status(500).json({ message: 'Error fetching leaderboard' })
  }
}

module.exports = { getCharacters, submitScore, leaderboardList }
