import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Report from './pages/Report'
import Statistics from './pages/Statistics'
import UberHistory from './components/UberHistory'
import Details from './pages/Details'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diaryreport' element={<Report />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/uber' element={<UberHistory />} />
          <Route path='/diaryreport/:id' element={<Details />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
