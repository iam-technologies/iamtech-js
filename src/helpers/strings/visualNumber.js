export default function visualNumber(x, decimalSeparator = ',', thousandSeparator = '.') {
  var parts = x.toString().split(thousandSeparator);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  return parts.join(decimalSeparator);
}
