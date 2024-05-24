import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Nav.css'

const Nav = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/diaryreport'>Reporte diário</NavLink>
      <NavLink to='/statistics'>Estadísticas</NavLink>
    </nav>
  )
}

export default Nav
