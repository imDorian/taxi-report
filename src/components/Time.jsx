/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { isThisMonth, isThisWeek, isToday } from '../functions/timeController'
import '../css/Time.css'

const Time = ({ data, week, month, today, prevDate }) => {
  const [newDate, setNewDate] = useState(new Date())
  // console.log(newDate.getMonth())
  const dataFiltered = data && data.filter(f => week ? isThisWeek(f.date) : month ? isThisMonth(f.date, newDate.getMonth()) : isToday(f.date))
  const taxi = dataFiltered && dataFiltered.filter(f => f.counter ?? f.counter)
    .reduce((total, data) => total + Number(data.counter) - Number(data.errors), 0).toFixed(2)
  const apps = dataFiltered && dataFiltered.filter(f => f.uber ?? f.bolt ?? f.cabify ?? f.freenow)
    .reduce((total, data) => total + Number(data.uber) + Number(data.bolt) + Number(data.cabify) + Number(data.freenow), 0).toFixed(2)
  const emisora = dataFiltered && dataFiltered.filter(f => f.emisora)
    .reduce((total, data) => total + Number(data.emisora), 0).toFixed(2)
  const fuel = dataFiltered && dataFiltered.filter(f => f.gasoline ?? f.diesel ?? f.gas ?? f.electricity)
    .reduce((total, data) => total + Number(data.gasoline) + Number(data.diesel) + Number(data.gas) + Number(data.electricity), 0).toFixed(2)
  const billing = dataFiltered && dataFiltered.filter(f => f.counter ?? f.uber ?? f.bolt ?? f.cabify ?? f.freenow ?? f.emisora)
    .reduce((total, data) => total + Number(data.counter) - Number(data.errors) + Number(data.uber) + Number(data.bolt) + Number(data.cabify) + Number(data.freenow) + Number(data.emisora), 0).toFixed(2)

  const handleDate = (e) => {
    if (month) {
      if (e === 'subtract') {
        setNewDate(new Date(newDate.setMonth(newDate.getMonth() - 1)))
      } else {
        setNewDate(new Date(newDate.setMonth(newDate.getMonth() + 1)))
      }
    }
  }
  console.log(newDate)
  return (
    <>
      <h2>
        <button className='change-date--btn' onClick={() => handleDate('subtract')}>-</button>
        {week ? 'Esta semana - ' + billing + '€' : month ? new Date(newDate).toLocaleDateString('es-Es', { month: 'long', year: 'numeric' }).toUpperCase() + ' - ' + billing + '€' : 'Hoy ' + billing + '€'}
        <button className='change-date--btn' onClick={() => handleDate('add')}>+</button>
      </h2>
      <div id='time-container'>
        <ul>
          <li>Taxi<span>{taxi}</span></li>
          <li>Apps<span>{apps}</span></li>
          <li>Emisora<span>{emisora}</span></li>
          <li>Combustible<span>{fuel}</span></li>
          {/* <li>Facturación: </li> */}
        </ul>
      </div>
    </>
  )
}

export default Time
