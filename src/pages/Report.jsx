import React from 'react'
import Nav from '../components/Nav'
import DiaryReportList from '../components/DiaryReportList'

const Report = () => {
  const localStorageData = JSON.parse(window.localStorage.getItem('localData'))

  return (
    <>
      <h1>Reporte</h1>
      <DiaryReportList data={localStorageData} />
      <Nav />
    </>
  )
}

export default Report
