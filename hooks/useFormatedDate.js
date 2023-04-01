export function useFormatedDate (date) {
  const formatedDate = typeof date === 'string' ? date.replace('-', ',') : date
  const today = date ? new Date(formatedDate) : new Date()
  const day = today.getDate().toString()
  const month = (today.getMonth() + 1).toString()
  const year = today.getFullYear().toString()
  const finalDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
  return { finalDate }
}
