import { create } from 'zustand'

export const useStore = create((set) => ({
  isModalDelete: false,
  deleteDate: '',
  deleteTotal: '',
  data: JSON.parse(window.localStorage.getItem('localData'))
}))
