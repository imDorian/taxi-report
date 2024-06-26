/* eslint-disable react/prop-types */
import '../css/DiaryReportList.css'
import { formatDate } from '../functions/formatDate'
import { useStore } from '../Stores/useStore'

const DiaryReportList = () => {
  // const [data, setData] = useState(JSON.parse(window.localStorage.getItem('localData')))
  const { data, isEdit } = useStore()
  console.log(data)
  const openModalDelete = (e) => {
    console.log(e.target)
    useStore.setState({
      isModalDelete: true,
      deleteDate: e.date,
      deleteId: e.id
    })
  }
  const handleEdit = () => {
    if (isEdit) {
      useStore.setState({
        isEdit: false
      })
    } else {
      useStore.setState({
        isEdit: true
      })
    }
  }
  const updateDate = (e) => {
    console.log(e)
    const newData = data.find(d => d.id === e.id)
    console.log(newData)
    const formDate = formatDate(e.date)
  }
  //   const deleteAllReport = () => {
  //     window.localStorage.clear('localData')
  //   }
  const localDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return (
    <div className='diary-report--container'>
      {/* <button onClick={handleEdit}>{isEdit ? 'Aceptar' : 'Editar'}</button> */}
      {/* <button onClick={deleteAllReport}>delete all</button> */}
      <ul>
        {!data || data.length === 0 ? 'Ningún reporte, añade tus ingresos desde el apartado home' : ''}
        {data && data.sort((b, a) => new Date(a.date) - new Date(b.date)).map(d => {
          const fuel = Number(d.gasoline ?? d.diesel ?? d.gas ?? d.electricity).toFixed(2)
          const returnFuel = d.returnFuel === 'full' ? fuel : d.returnFuel === '1.50' ? fuel * 0.5 : d.returnFuel === '0' ? fuel * 0 : (fuel - fuel / d.returnFuel).toFixed(2)
          const total = (Number(d.uber) + Number(d.uberPromotions) + Number(d.uberTips) + Number(d.bolt) + Number(d.freenowOutOfApp) + Number(d.freenowOnApp) + Number(d.cabify) + Number(d.counter) - Number(d.errors)).toFixed(2)
          const totalApps = (Number(d.uber) + Number(d.uberPromotions) + Number(d.uberTips) + Number(d.bolt) + Number(d.freenowOutOfApp) + Number(d.freenowOnApp) + Number(d.cabify)).toFixed(2)
          const returnFuelPorcent = d.returnFuel === 'full' ? '100' : d.returnFuel === '0' ? 0 : d.returnFuel.slice(2)
          const counter = (Number(d.counter) - Number(d.errors)).toFixed(2)
          return (
            <li key={d.id}>
              <div className='date-container'>
                {
                  isEdit
                    ? <input type='date' value={formatDate(d.date)} onChange={() => updateDate(d)} />
                    : <span> {new Date(d.date).toLocaleDateString('Es-es', localDate)}</span>

                }
                <button onClick={() => openModalDelete(d)} className='delete-button'>X</button>
              </div>
              <div className='total-diary--container'>
                <div>Taxi <span>{counter}{d.currency}</span></div>
                <div>Apps <span>{totalApps}{d.currency}</span></div>
                {/* <div>Emisoras <span>{d.currency}</span></div> */}
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
