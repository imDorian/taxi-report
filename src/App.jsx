import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Report from './pages/Report'
import Statistics from './pages/Statistics'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diaryreport' element={<Report />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
