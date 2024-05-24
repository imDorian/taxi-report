import { useEffect, useState } from 'react'
import { currencies } from '../utils/currencies'
import '../css/Calculator.css'
const Calculator = () => {
  const [formData, setFormData] = useState({
    date: '',
    currency: currencies[1],
    counter: '',
    card: '',
    cash: '',
    nErrors: '',
    errors: '',
    uber: '',
    freenow: '',
    cabify: '',
    bolt: '',
    amarilla: '',
    emisora: '',
    gasoline: '',
    diesel: '',
    gas: '',
    electricity: '',
    returnFuel: '',
    id: crypto.randomUUID()
  })
  const localStorageData = JSON.parse(window.localStorage.getItem('localData'))
  const saveData = (e) => {
    e.preventDefault()
    console.log(formData)
    // recoger los datos del form y guardarlos en localStorage
    if (!localStorageData) {
      const localData = [formData]
      window.localStorage.setItem('localData', JSON.stringify(localData))
    } else {
      const newLocalData = [...localStorageData, formData]
      window.localStorage.setItem('localData', JSON.stringify(newLocalData))
    }
    setFormData({
      ...formData,
      counter: '',
      card: '',
      cash: '',
      nErrors: '',
      errors: '',
      uber: '',
      freenow: '',
      cabify: '',
      bolt: '',
      gasoline: '',
      diesel: '',
      gas: '',
      electricity: '',
      id: crypto.randomUUID()
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const formatDate = (date) => {
    const newDate = date ? new Date(date) : new Date()
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    month = month < 10 ? `0${month}` : month // Agrega un cero al mes si es necesario
    let day = newDate.getDate()
    day = day < 10 ? `0${day}` : day // Agrega un cero al día si es necesario

    const formattedDate = `${year}-${month}-${day}`

    // Establece la fecha actual en el estado
    setFormData({
      ...formData,
      date: formattedDate
    })
    return formattedDate
  }
  useEffect(() => {
    formatDate()
  }, [])

  return (
    <div id='calculator-container'>
      <div>
        <input id='date-input' type='date' value={formData.date} onChange={e => formatDate(e.target.value)} />
        <select name='currency' id='currencies' value={formData.currency} onChange={handleChange}>
          {currencies.map(c =>
            <option key={c} value={c}>{c}</option>
          )}
        </select>
      </div>
      <form id='form-container' onSubmit={saveData} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <fieldset style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '5px' }}>
          <legend>Taxímetro</legend>
          <label>Contador * <input name='counter' value={formData.counter} onChange={handleChange} required type='number' placeholder='120,95 €' /></label>
          <label>Tarjeta * <input required name='card' value={formData.card} onChange={handleChange} type='number' placeholder='98,50 €' /></label>
          <label>Efectivo <input name='cash' value={formData.cash} onChange={handleChange} type='number' placeholder='54,40 €' /></label>
          <label>Nº de errores <input name='nErrors' value={formData.nErrors} onChange={handleChange} type='number' placeholder='2' /></label>
          <label>Errores <input name='errors' value={formData.errors} onChange={handleChange} type='number' placeholder='3,30 €' /></label>
        </fieldset>
        <fieldset style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '5px' }}>
          <legend>Apps</legend>
          <label>Uber <input name='uber' value={formData.uber} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
          <label>FreeNow <input name='freenow' value={formData.freenow} onChange={handleChange} type='number' placeholder='10 €' /></label>
          <label>Cabify <input name='cabify' value={formData.cabify} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <label>Bolt <input name='bolt' value={formData.bolt} onChange={handleChange} type='number' placeholder='5,75 €' /></label>
        </fieldset>
        <fieldset style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '5px' }}>
          <legend>Combustible</legend>
          <label>Gasolina <input name='gasoline' value={formData.gasoline} onChange={handleChange} type='number' placeholder='55,10 €' /></label>
          <label>Diesel <input name='diesel' value={formData.diesel} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <label>Gas <input name='gas' value={formData.gas} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <label>Electricidad <input name='electricity' value={formData.electricity} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <fieldset>
            <legend>Devolución combustible</legend>
            <label><input name='returnFuel' value='0' onChange={handleChange} type='radio' /> 0%</label>
            <label><input name='returnFuel' value='1.21' onChange={handleChange} type='radio' /> 21%</label>
            <label><input name='returnFuel' value='1.50' onChange={handleChange} type='radio' /> 50%</label>
            <label><input name='returnFuel' value='full' onChange={handleChange} type='radio' /> 100%</label>
          </fieldset>
        </fieldset>
        <button>Guardar</button>
      </form>
    </div>
  )
}

export default Calculator
