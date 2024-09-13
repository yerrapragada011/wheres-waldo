import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error('Error fetching leaderboard:', error))
  }, [])

  return (
    <div
      style={{
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3'>No scores available yet</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to='/'>Go Home</Link>
    </div>
  )
}

export default Leaderboard
