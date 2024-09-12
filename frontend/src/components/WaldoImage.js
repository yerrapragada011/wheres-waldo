import React, { useState, useEffect, useRef } from 'react'
import image from '../assets/waldo-image.jpeg'

const WaldoImage = () => {
  const [waldoLocation, setWaldoLocation] = useState({})
  const [wandaLocation, setWandaLocation] = useState({})
  const [woofLocation, setWoofLocation] = useState({})
  const [wizardLocation, setWizardLocation] = useState({})
  const [odlawLocation, setOdlawLocation] = useState({})

  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 })
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState('')

  const imageRef = useRef(null)

  useEffect(() => {
    setWaldoLocation({ x: '43.5%', y: '20.0%' })
    setWandaLocation({ x: '35.5%', y: '67.0%' })
    setWoofLocation({ x: '73.5%', y: '47.5%' })
    setWizardLocation({ x: '65.0%', y: '39.0%' })
    setOdlawLocation({ x: '12.5%', y: '56.0%' })
  }, [])

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

    const tolerance = 3

    const locations = {
      Waldo: waldoLocation,
      Wanda: wandaLocation,
      Woof: woofLocation,
      Wizard: wizardLocation,
      Odlaw: odlawLocation
    }

    const location = locations[selectedCharacter]
    if (location) {
      const targetXPercent = parseFloat(location.x)
      const targetYPercent = parseFloat(location.y)

      if (
        Math.abs(clickXPercent - targetXPercent) < tolerance &&
        Math.abs(clickYPercent - targetYPercent) < tolerance
      ) {
        alert(`You found ${selectedCharacter}!`)
      } else {
        alert('Wrong choice, try again!')
      }
    }
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
              <option value='Waldo'>Waldo</option>
              <option value='Wanda'>Wanda</option>
              <option value='Woof'>Woof's tail</option>
              <option value='Wizard'>Wizard Whitebeard</option>
              <option value='Odlaw'>Odlaw</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaldoImage
