import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WaldoImage from './components/WaldoImage'
import Leaderboard from './components/Leaderboard'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WaldoImage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  )
}

export default App
