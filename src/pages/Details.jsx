/* eslint-disable react/prop-types */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../Stores/useStore'
import Nav from '../components/Nav'

const Details = () => {
  const { id } = useParams()
  const { data } = useStore()
  const detailData = data.find(f => f.id === id)
  console.log(detailData)
  const calculateTotal = (detail) => {
    const counter = Number(detail.counter) || 0
    const freenowTaximeter = Number(detail.freenowTaximeter) || 0
    const uber = Number(detail.uber) || 0
    const freenowOnApp = Number(detail.freenowOnApp) || 0
    const freenowOutOfApp = Number(detail.freenowOutOfApp) || 0
    const errors = Number(detail.errors) || 0

    return counter - freenowTaximeter - errors + uber + freenowOnApp + freenowOutOfApp
  }
  const total = calculateTotal(detailData)
  return (
    <>
      <span>{new Date(detailData.date).toLocaleDateString('es-Es', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
      <h3>taxi</h3>
      <span>Counter: {detailData.counter}</span>
      <span>Card: {detailData.card}</span>
      <span>Cash: {detailData.cash}</span>
      <h3>uber</h3>
      <span>Total: {detailData.uber}</span>
      <span>Propina :{detailData.uberTips}</span>
      <span>Promociones: {detailData.uberPromotions}</span>
      <h3>FreeNow</h3>
      <span>Saldo FreeNow: {detailData.freenowOnApp}</span>
      <span>Fuera de la app: {detailData.freenowOutOfApp}</span>
      <span>Tarjeta: {detailData.freenowCard}</span>
      <span>Efectivo: {detailData.freenowCash}</span>
      <span>Taxímetro: {detailData.freenowTaximeter}</span>
      <h1>total : {total}</h1>
      <Nav />
    </>
  )
}

export default Details
