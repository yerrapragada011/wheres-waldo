import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/waldo-image.jpeg'
import instructionsImage from '../assets/wally-and-friends.jpeg'

const WaldoImage = () => {
  const [characters, setCharacters] = useState([])
  const [foundCharacters, setFoundCharacters] = useState([])
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 })
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [username, setUsername] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL

  const imageRef = useRef(null)
  const navigate = useNavigate()

  const startGame = () => {
    setGameStarted(true)
    setStartTime(Date.now())

    fetch(`${apiUrl}/api/characters`)
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error('Error fetching characters:', error))
  }

  useEffect(() => {
    let intervalId
    if (gameStarted && !endTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [gameStarted, startTime, endTime])

  const handleClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    setClickCoords({ x: offsetX, y: offsetY })
    setShowDropdown(true)
  }

  const handleCharacterSelection = (event) => {
    setSelectedCharacter(event.target.value)
    setShowDropdown(false)
    checkCharacterLocation()
  }

  const checkCharacterLocation = () => {
    const { x, y } = clickCoords
    const imgWidth = imageRef.current.offsetWidth
    const imgHeight = imageRef.current.offsetHeight

    const clickXPercent = (x / imgWidth) * 100
    const clickYPercent = (y / imgHeight) * 100

    const tolerance = 10

    const character = characters.find((c) => c.name === selectedCharacter)
    if (character) {
      const targetXPercent = parseFloat(character.x)
      const targetYPercent = parseFloat(character.y)

      if (
        Math.abs(clickXPercent - targetXPercent) < tolerance &&
        Math.abs(clickYPercent - targetYPercent) < tolerance
      ) {
        alert(`You found ${selectedCharacter}!`)
        setFoundCharacters([...foundCharacters, selectedCharacter])

        if (foundCharacters.length + 1 === characters.length) {
          setEndTime(Date.now())
        }
      } else {
        alert('Wrong choice, try again!')
      }
    }
  }

  const handleSubmit = async () => {
    const totalTime = Math.floor((endTime - startTime) / 1000)
    try {
      const response = await fetch(`${apiUrl}/api/submit-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          score: totalTime
        })
      })

      if (response.ok) {
        alert(`Score submitted! Time: ${totalTime} seconds`)
        navigate(`/leaderboard`)
      } else {
        alert('Error submitting score')
      }
    } catch (error) {
      console.error('Error submitting score:', error)
    }
  }

  if (!gameStarted) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <h2>Welcome to Find the Characters!</h2>
        <img src={instructionsImage} alt='Characters to find' />
        <button onClick={startGame}>Start Game</button>
        <Link to='/leaderboard'>View Leaderboard</Link>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2>Find the Characters!</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Elapsed Time: {elapsedTime} seconds</h3>
      </div>
      {endTime && (
        <>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
          />
          <button onClick={handleSubmit}>Submit Score</button>
        </>
      )}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          ref={imageRef}
          src={image}
          alt='Waldo'
          onClick={handleClick}
          style={{ maxWidth: '1400px', minWidth: '1000px', width: '100%' }}
        />
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: `${clickCoords.y}px`,
              left: `${clickCoords.x}px`,
              border: '2px solid red',
              width: '50px',
              height: '50px',
              backgroundColor: 'rgba(255, 0, 0, 0.3)'
            }}
          >
            <select onChange={handleCharacterSelection} defaultValue=''>
              <option value='' disabled>
                Select a character
              </option>
              {characters.map((character) => (
                <option key={character.id} value={character.name}>
                  {character.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaldoImage
