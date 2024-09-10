function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTimetoStr(seconds) {
  return formatNumber(Math.floor(seconds / 60)) + ":" + (seconds % 60 / 100).toFixed(2).slice(-2);

}

module.exports = {
  formatTime: formatTime,
  formatTimetoStr:formatTimetoStr
}