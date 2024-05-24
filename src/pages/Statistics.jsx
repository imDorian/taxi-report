import Nav from '../components/Nav'
import { ChartComponent } from '../components/ChartComponent'
import LastWeek from '../components/Week'

const Statistics = () => {
  const data = JSON.parse(window.localStorage.getItem('localData'))
  return (
    <div>
      <h1>Estadísticas</h1>
      <ChartComponent data={data} />
      <LastWeek data={data} />
      <Nav />
    </div>
  )
}

export default Statistics
