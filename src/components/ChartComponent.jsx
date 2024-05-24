/* eslint-disable react/prop-types */
import { createChart } from 'lightweight-charts'
import React, { useEffect, useRef } from 'react'

export const ChartComponent = props => {
  const {
    // eslint-disable-next-line react/prop-types
    data,
    // eslint-disable-next-line react/prop-types
    colors: {
      backgroundColor = 'transparent',
      lineColor = '#2962FF',
      textColor = 'white',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)'
    } = {}
  } = props
  const chartContainerRef = useRef()

  // Transformar la fecha al formato 'yyyy-mm-dd'
  const localData = data.map(d => ({
    time: new Date(d.date).toISOString().split('T')[0],
    value: Number(d.counter)
  })).sort((a, b) => new Date(a.time) - new Date(b.time))

  // Función para obtener el lunes y domingo de la semana actual
  const getWeekRange = () => {
    const currentDate = new Date()
    const dayOfWeek = currentDate.getDay()
    const differenceToMonday = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Ajuste si es domingo
    const monday = new Date(currentDate.setDate(differenceToMonday))
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    return { monday, sunday }
  }

  // Función para generar los días de la semana actual
  const generateCurrentWeekDays = () => {
    const { monday } = getWeekRange()
    const result = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      result.push(date.toISOString().split('T')[0])
    }
    return result
  }

  // Rellenar localData con los días faltantes de la semana actual
  const completeWeekData = () => {
    const currentWeekDays = generateCurrentWeekDays()
    const completeData = currentWeekDays.map(date => {
      const found = localData.find(d => d.time === date)
      return found || { time: date, value: 0 }
    })
    return completeData
  }

  const weekData = completeWeekData()

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: backgroundColor },
        textColor,
        fontSize: 16,
        fontWeight: 'bold'
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: {
          color: 'transparent'
        },
        horzLines: {
          color: 'transparent'
        }
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false
      },
      handleScroll: {
        vertTouchDrag: false,
        horzTouchDrag: false,
        mouseWheel: false,
        pressedMouseMove: false
      }
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addHistogramSeries({
      color: lineColor,
      base: 0,
      priceLineVisible: false,
      priceFormat: {
        type: 'volume',
        precision: 0,
        minMove: 1
      }
    })
    newSeries.setData(weekData)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [weekData, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor])

  return <div ref={chartContainerRef} />
}
