/* eslint-disable react/prop-types */
import '../css/DeleteModal.css'
import { useStore } from '../Stores/useStore'

const DeleteModal = () => {
  const { isModalDelete, deleteDate, deleteId, data } = useStore()
  const closeModal = () => {
    useStore.setState({
      isModalDelete: false
    })
  }
  const deleteReport = () => {
    // const oldData = JSON.parse(window.localStorage.getItem('localData'))
    const newData = data.filter(f => f.id !== deleteId)
    try {
      window.localStorage.setItem('localData', JSON.stringify(newData))
      useStore.setState({
        data: newData,
        isModalDelete: false
      })
    } catch (error) {
      console.error(error)
    }
    // setData(newData)
  }
  return (
    isModalDelete &&
      <div className='delete-modal'>
        <button id='quit-modal-delete' onClick={closeModal}>X</button>
        <h3>¿Estás seguro que quieres borrar el registro?</h3>
        <span>Fecha: {new Date(deleteDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        <button onClick={deleteReport} id='delete-btn'>Borrar</button>
      </div>
  )
}

export default DeleteModal
