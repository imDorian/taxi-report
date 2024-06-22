import React from 'react'
import Nav from '../components/Nav'
import DiaryReportList from '../components/DiaryReportList'
import DeleteModal from '../components/DeleteModal'

const Report = () => {
  const localStorageData = JSON.parse(window.localStorage.getItem('localData'))

  return (
    <>
      <h1>Reporte</h1>
      <DiaryReportList data={localStorageData} />
      <DeleteModal />
      <Nav />
    </>
  )
}

export default Report
