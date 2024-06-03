import Nav from '../components/Nav'
// import { ChartComponent } from '../components/ChartComponent'
import Time from '../components/Time'

const Statistics = () => {
  const data = JSON.parse(window.localStorage.getItem('localData'))
  console.log()
  return (
    <>
      <h1>Estadísticas</h1>
      {/* <ChartComponent data={data} /> */}
      <Time data={data} today='true' />
      <Time data={data} week='true' />
      <Time data={data} month='true' />
      <Nav />
    </>
  )
}

export default Statistics
