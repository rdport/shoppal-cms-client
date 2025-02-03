function formatDate (updatedAt) {
  const d = new Date(updatedAt)
  const time = d.toString().split(' G')[0]
  return time
}

module.exports = formatDate
