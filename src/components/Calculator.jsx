import { useEffect, useRef, useState } from 'react'
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
    uberCash: '',
    uberPromotions: '',
    uberTips: '',
    freenowOutOfApp: '',
    freenowOnApp: '',
    freenowTaximeter: '',
    freenowCash: '',
    freenowCard: '',
    cabify: '',
    cabifyCash: '',
    cabifyTips: '',
    cabifyPromotions: '',
    bolt: '',
    boltCash: '',
    boltTips: '',
    boltPromotions: '',
    amarilla: '',
    emisora: '',
    gasoline: '',
    diesel: '',
    gas: '',
    electricity: '',
    returnFuel: '',
    id: crypto.randomUUID()
  })
  const [isOpen, setIsOpen] = useState(false)
  const FNdataphoneRef = useRef()
  const FNcashRef = useRef()
  const freenowTxRefInput = useRef()

  const localStorageData = JSON.parse(window.localStorage.getItem('localData'))

  const saveData = (e) => {
    e.preventDefault()
    console.log(formData)
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
      uberCash: '',
      uberPromotions: '',
      uberTips: '',
      freenowOutOfApp: '',
      freenowOnApp: '',
      freenowTaximeter: '',
      freenowCash: '',
      freenowCard: '',
      cabify: '',
      cabifyCash: '',
      cabifyTips: '',
      cabifyPromotions: '',
      bolt: '',
      boltCash: '',
      boltTips: '',
      boltPromotions: '',
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

  const formatDate = () => {
    const newDate = new Date()
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    let day = newDate.getDate()
    day = day < 10 ? `0${day}` : day

    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate)
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: formattedDate
    }))
  }

  const autoCalculate = (total, card, cash) => {
    if (card > 0 && total > 0) {
      const newCash =
        Number(total) - Number(card) <= 0 || card === ''
          ? ''
          : Number(total) - Number(card)
      setFormData((prevFormData) => ({
        ...prevFormData,
        [cash]: newCash
      }))
      console.log(newCash)
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [cash]: ''
      }))
    }
  }

  const freenowTaximeter = () => {
    if (formData.freenowOutOfApp || formData.freenowOnApp) {
      freenowTxRefInput.current.disabled = false
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        freenowTaximeter: ''
      }))
      freenowTxRefInput.current.disabled = true
    }
  }

  const autoOpen = () => {
    if (formData.freenowOutOfApp > 0) {
      FNcashRef.current.disabled = false
      FNdataphoneRef.current.disabled = false
      setIsOpen(true)
      setFormData((prevFormData) => ({
        ...prevFormData,
        freenowCard: '',
        freenowCash: ''
      }))
    } else {
      FNcashRef.current.disabled = true
      FNdataphoneRef.current.disabled = true
      setIsOpen(false)
      setFormData((prevFormData) => ({
        ...prevFormData,
        freenowCard: '',
        freenowCash: ''
      }))
    }
  }

  useEffect(() => {
    formatDate()
  }, [])

  useEffect(() => {
    freenowTaximeter()
  }, [formData.freenowOutOfApp, formData.freenowOnApp])

  useEffect(() => {
    if (formData.freenowCard !== '') {
      autoCalculate(formData.freenowOutOfApp, formData.freenowCard, 'freenowCash')
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        freenowCash: ''
      }))
    }
  }, [formData.freenowCard])

  useEffect(() => {
    autoOpen()
  }, [formData.freenowOutOfApp])

  useEffect(() => {
    autoCalculate(formData.counter, formData.card, 'cash')
  }, [formData.card])

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
      <form id='form-container' onSubmit={saveData}>
        <fieldset>
          <legend>Taxímetro</legend>
          <label>Contador * <input inputMode='numeric' name='counter' value={formData.counter} onChange={handleChange} required type='number' placeholder='120,95 €' /></label>
          <label>Tarjeta * <input inputMode='numeric' required name='card' value={formData.card} onChange={handleChange} type='number' placeholder='98,50 €' /></label>
          <label>Efectivo <input inputMode='numeric' name='cash' value={formData.cash} onChange={handleChange} type='number' placeholder='54,40 €' /></label>
          <label>Nº de errores <input inputMode='numeric' name='nErrors' value={formData.nErrors} onChange={handleChange} type='number' placeholder='2' /></label>
          <label>Errores <input inputMode='numeric' name='errors' value={formData.errors} onChange={handleChange} type='number' placeholder='3,30 €' /></label>
        </fieldset>
        <fieldset>
          <legend>Apps</legend>
          {/* <label>Uber <input name='uber' value={formData.uber} onChange={handleChange} type='number' placeholder='49,25 €' /></label> */}
          <details>
            <summary>Uber</summary>
            <label>Total<input inputMode='numeric' name='uber' value={formData.uber} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Efectivo<input inputMode='numeric' name='uberCash' value={formData.uberCash} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Propinas<input inputMode='numeric' name='uberTips' value={formData.uberTips} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Promociones<input inputMode='numeric' name='uberPromotions' value={formData.uberPromotions} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
          </details>
          <details>
            <summary>FreeNow</summary>
            <details open={isOpen} className='details-on-details'>
              <summary><span>Pagos fuera de app</span>
                <input inputMode='numeric' name='freenowOutOfApp' value={formData.freenowOutOfApp} onChange={handleChange} type='number' placeholder='49,25 €' />
              </summary>
              <div>
                <label>Datáfono<input inputMode='numeric' ref={FNdataphoneRef} name='freenowCard' value={formData.freenowCard} onChange={handleChange} type='number' placeholder='10 €' /></label>
                <label>Efectivo<input inputMode='numeric' ref={FNcashRef} name='freenowCash' value={formData.freenowCash} onChange={handleChange} type='number' placeholder='10 €' /></label>
              </div>
            </details>
            <label><span>Saldo FreeNow</span><input inputMode='numeric' name='freenowOnApp' value={formData.freenowOnApp} onChange={handleChange} type='number' placeholder='10 €' /></label>
            <label><span>Taximetro</span><input inputMode='numeric' ref={freenowTxRefInput} name='freenowTaximeter' value={formData.freenowTaximeter} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
          </details>
          <details>
            <summary>Cabify</summary>
            <label>Total<input inputMode='numeric' name='cabify' value={formData.cabify} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Efectivo<input inputMode='numeric' name='cabifyCash' value={formData.cabifyCash} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Propinas<input inputMode='numeric' name='cabifyTips' value={formData.cabifyTips} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Promociones<input inputMode='numeric' name='cabifyPromotions' value={formData.cabifyPromotions} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
          </details>
          <details>
            <summary>Bolt</summary>
            <label>Total<input inputMode='numeric' name='bolt' value={formData.bolt} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Efectivo<input inputMode='numeric' name='boltCash' value={formData.boltCash} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Propinas<input inputMode='numeric' name='boltTips' value={formData.boltTips} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
            <label>Promociones<input inputMode='numeric' name='boltPromotions' value={formData.boltPromotions} onChange={handleChange} type='number' placeholder='49,25 €' /></label>
          </details>
          {/* <label>Cabify <input name='cabify' value={formData.cabify} onChange={handleChange} type='number' placeholder='0 €' /></label> */}
          {/* <label>Bolt <input name='bolt' value={formData.bolt} onChange={handleChange} type='number' placeholder='5,75 €' /></label> */}
        </fieldset>
        <fieldset>
          <legend>Combustible</legend>
          <label>Gasolina <input inputMode='numeric' name='gasoline' value={formData.gasoline} onChange={handleChange} type='number' placeholder='55,10 €' /></label>
          <label>Diesel <input inputMode='numeric' name='diesel' value={formData.diesel} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <label>Gas <input inputMode='numeric' name='gas' value={formData.gas} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <label>Electricidad <input inputMode='numeric' name='electricity' value={formData.electricity} onChange={handleChange} type='number' placeholder='0 €' /></label>
          <fieldset className='returnFuel'>
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
