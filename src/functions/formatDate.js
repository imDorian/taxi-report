export const formatDate = (e) => {
  const newDate = !e ? new Date() : new Date(e)
  const year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day = newDate.getDate()
  day = day < 10 ? `0${day}` : day

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
