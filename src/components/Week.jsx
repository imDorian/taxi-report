/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react'
import { isThisWeek } from '../functions/timeController'
import '../css/Week.css'

const Week = ({ data }) => {
  const dataFiltered = data && data.filter(f => isThisWeek(f.date))
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

  return (
    <>
      <h2>Esta semana</h2>
      <div id='week-container'>
        <ul>
          <li>Taxi: {taxi} </li>
          <li>Apps: {apps}</li>
          <li>Emisora: {emisora}</li>
          <li>Combustible: {fuel}</li>
          <li>Facturación: {billing}</li>
        </ul>
      </div>
    </>
  )
}

export default Week
