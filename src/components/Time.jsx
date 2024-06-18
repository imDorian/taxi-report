/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react'
import { isThisMonth, isThisWeek, isToday } from '../functions/timeController'
import '../css/Time.css'

const Time = ({ data, week, month, today }) => {
  const [newDate, setNewDate] = useState(new Date())
  const [dataFiltered, setDataFiltered] = useState([])

  useEffect(() => {
    const filteredData = data && data.filter(f => {
      if (week) return isThisWeek(f.date)
      if (month) return isThisMonth(f.date, newDate.getMonth())
      if (today) return isToday(f.date)
      return false
    })
    setDataFiltered(filteredData || [])
  }, [data, week, month, today, newDate])

  const calculateSum = (key, subtract = [], add = []) => {
    return dataFiltered
      .reduce((total, item) => {
        let value = Number(item[key] || 0)
        subtract.forEach(subKey => value -= Number(item[subKey] || 0))
        add.forEach(addKey => value += Number(item[addKey] || 0))
        return total + value
      }, 0)
      .toFixed(2)
  }

  const taxi = calculateSum('counter', ['errors', 'freenowTaximeter'])
  const apps = calculateSum('', [], ['uber', 'uberTips', 'uberPromotions', 'bolt', 'cabify', 'freenowOutOfApp', 'freenowOnApp'])
  const emisora = calculateSum('emisora')
  const fuel = calculateSum('', [], ['gasoline', 'diesel', 'gas', 'electricity'])
  const billing = calculateSum('counter', ['errors', 'freenowTaximeter'], ['uber', 'uberTips', 'uberPromotions', 'freenowOutOfApp', 'freenowOnApp', 'bolt', 'cabify'])
  const cash = calculateSum('', [], ['cash', 'uberCash', 'freenowCash', 'boltCash', 'cabifyCash'])

  const handleDate = (e) => {
    if (month) {
      setNewDate(prevDate => {
        const newDate = new Date(prevDate)
        if (e === 'subtract') newDate.setMonth(newDate.getMonth() - 1)
        else newDate.setMonth(newDate.getMonth() + 1)
        return newDate
      })
    }
  }

  return (
    <>
      <h2>
        <button className='change-date--btn' onClick={() => handleDate('subtract')}>-</button>
        {week ? `Esta semana - ${billing}€` : month ? `${new Date(newDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()} - ${billing}€` : `Hoy ${billing}€`}
        <button className='change-date--btn' onClick={() => handleDate('add')}>+</button>
      </h2>
      <div id='time-container'>
        <ul>
          <li>Taxi<span>{taxi}</span></li>
          <li>Efectivo<span>{cash}</span></li>
          <li>Apps<span>{apps}</span></li>
          {emisora > 0 && <li>Emisora<span>{emisora}</span></li>}
          <li>Combustible<span>{fuel}</span></li>
        </ul>
      </div>
    </>
  )
}

export default Time
