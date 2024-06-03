import React from 'react'
import Nav from '../components/Nav'
import DiaryReportList from '../components/DiaryReportList'

const Report = () => {
  const localStorageData = JSON.parse(window.localStorage.getItem('localData'))

  return (
    <>
      <DiaryReportList data={localStorageData} />
      <Nav />
    </>
  )
}

export default Report
