export default function formatNumber (number) {
  if (number) {
    let str = number.toString()
    let new_str = ''
    let i
    let index = 0

    for (i = str.length - 1; i >= 0; i--) {
      if (index % 3 === 0 && index !== 0) {
        new_str = ',' + new_str
      }
      new_str = str[i] + new_str
      index += 1
    }
    return new_str
  } else {
    return ''
  }
}
