export function formatDate(dateString, options) {
  const dateFormatter = new Intl.DateTimeFormat('en-US', options)
  const [month, day, year] = dateString.split('-')
  const formattedDateString = `${year}-${month}-${day}`

  return dateFormatter.format(new Date(formattedDateString)).replace(',', '')
}
