export default function getDays () {
  // return firt day of month and now day
  let today = new Date()
  return {
    from_date: `01-${today.getMonth()}-${today.getFullYear()}`,
    to_date: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
  }
}
