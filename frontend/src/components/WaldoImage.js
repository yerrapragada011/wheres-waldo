import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    // // Fetch all character locations (this example only handles Waldo for now)
    // fetch('http://localhost:8000/waldo-location')
    //   .then((response) => response.json())
    //   .then((data) => setWaldoLocation(data))

    // // You can fetch other character locations similarly
    // fetch('http://localhost:8000/wanda-location')
    //   .then((response) => response.json())
    //   .then((data) => setWandaLocation(data))

    // fetch('http://localhost:8000/woof-location')
    //   .then((response) => response.json())
    //   .then((data) => setWoofLocation(data))

    // fetch('http://localhost:8000/wizard-location')
    //   .then((response) => response.json())
    //   .then((data) => setWizardLocation(data))

    // fetch('http://localhost:8000/odlaw-location')
    //   .then((response) => response.json())
    //   .then((data) => setOdlawLocation(data))
    setWaldoLocation({ x: 610, y: 190 })
    setWandaLocation({ x: 500, y: 670 })
    setWoofLocation({ x: 1025, y: 420 })
    setWizardLocation({ x: 910, y: 350 })
    setOdlawLocation({ x: 170, y: 500 })
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

    if (
      selectedCharacter === 'Waldo' &&
      Math.abs(x - waldoLocation.x) < 20 &&
      Math.abs(y - waldoLocation.y) < 20
    ) {
      alert('You found Waldo!')
    } else if (
      selectedCharacter === 'Wanda' &&
      Math.abs(x - wandaLocation.x) < 20 &&
      Math.abs(y - wandaLocation.y) < 20
    ) {
      alert('You found Wanda!')
    } else if (
      selectedCharacter === 'Woof' &&
      Math.abs(x - woofLocation.x) < 20 &&
      Math.abs(y - woofLocation.y) < 20
    ) {
      alert('You found Woof’s tail!')
    } else if (
      selectedCharacter === 'Wizard' &&
      Math.abs(x - wizardLocation.x) < 20 &&
      Math.abs(y - wizardLocation.y) < 20
    ) {
      alert('You found Wizard Whitebeard!')
    } else if (
      selectedCharacter === 'Odlaw' &&
      Math.abs(x - odlawLocation.x) < 20 &&
      Math.abs(y - odlawLocation.y) < 20
    ) {
      alert('You found Odlaw!')
    } else {
      alert('Wrong choice, try again!')
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
          src={image}
          alt='Waldo'
          onClick={handleClick}
          style={{ maxWidth: '1400px', width: '100%' }}
        />
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: clickCoords.y - 20,
              left: clickCoords.x,
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
