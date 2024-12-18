const formatDate = (date: Date | string): string => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  })
}

export default formatDate
