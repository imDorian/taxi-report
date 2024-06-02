/* eslint-disable react/prop-types */
import React from 'react'

const List = ({ size, color }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' style={{ fill: color, transform: '', msFilter: '' }}>
      <path d='M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z' />
    </svg>
  )
}

export default List
