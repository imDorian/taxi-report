/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import '../css/DiaryReportList.css'

const DiaryReportList = () => {
  const [data, setData] = useState(JSON.parse(window.localStorage.getItem('localData')))
  const deleteReport = (e) => {
    const newData = data.filter(f => f.id !== e.id)
    window.localStorage.setItem('localData', JSON.stringify(newData))
    setData(newData)
  }
  //   const deleteAllReport = () => {
  //     window.localStorage.clear('localData')
  //   }
  const localDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  console.log(data)
  return (
    <div className='diary-report--container'>
      {/* <button onClick={deleteAllReport}>delete all</button> */}
      <ul>
        {!data || data.length === 0 ? 'Ningún reporte, añade tus ingresos desde el apartado home' : ''}
        {data && data.reverse().map(d => {
          const fuel = Number(d.gasoline ?? d.diesel ?? d.gas ?? d.electricity).toFixed(2)
          const returnFuel = d.returnFuel === 'full' ? fuel : d.returnFuel === '1.50' ? fuel * 0.5 : d.returnFuel === '0' ? fuel * 0 : (fuel - fuel / d.returnFuel).toFixed(2)
          const total = (Number(d.uber) + Number(d.bolt) + Number(d.freenow) + Number(d.cabify) + Number(d.counter)).toFixed(2)
          const totalApps = (Number(d.uber) + Number(d.bolt) + Number(d.freenow) + Number(d.cabify)).toFixed(2)
          const returnFuelPorcent = d.returnFuel === 'full' ? '100' : d.returnFuel === '0' ? 0 : d.returnFuel.slice(2)
          const counter = Number(d.counter).toFixed(2)
          return (
            <li key={d.id}>
              <div className='date-container'>{new Date(d.date).toLocaleDateString('Es-es', localDate)} <button onClick={() => deleteReport(d)} className='delete-button'>X</button></div>
              <div className='total-diary--container'>
                <div>Taxi <span>{counter}{d.currency}</span></div>
                <div>Apps <span>{totalApps}{d.currency}</span></div>
                <div>Emisoras <span>{d.currency}</span></div>
                <div>Total<span>{total}{d.currency}</span></div>
              </div>
              {fuel > 0 &&
                <div className='fuel-container'>
                  Combustible: {fuel}{d.currency} - Devolución: {returnFuel}{d.currency} ({returnFuelPorcent}%)
                </div>}

            </li>
          )
        }

        )}
      </ul>
    </div>
  )
}

export default DiaryReportList
