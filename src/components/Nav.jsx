import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Nav.css'
import Car from '../icons/Car'
import List from '../icons/List'
import Stats from '../icons/Stats'

const Nav = () => {
  return (
    <nav>
      <NavLink activeclassname='active' to='/'><Car size='25px' /></NavLink>
      <NavLink activeclassname='active' to='/diaryreport'><List size='25px' /></NavLink>
      <NavLink activeclassname='active' to='/statistics'><Stats size='25px' /></NavLink>
    </nav>
  )
}

export default Nav
