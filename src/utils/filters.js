
function add0(m) {
  return m < 10 ? '0' + m : m
}

// 格式时间戳
function formatTimeStamp(timestamp) {
  if (!timestamp || timestamp === '') {
    return ''
  }
  var time = new Date(parseInt(timestamp))
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

// 格式时间戳
function formatTimeStampMinute(timestamp) {
  if (!timestamp || timestamp === '') {
    return ''
  }
  const time = new Date(parseInt(timestamp))
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const mm = time.getMinutes()
  const s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

// 格式时间戳
function formatDate(date) {
  if (!date || date === '') {
    return ''
  }
  const time = new Date(date)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + add0(m) + '-' + add0(d)
}

// 格式化日志等级
function formatLogLevel(logLevel) {
  let log = ''
  switch (logLevel) {
    case 0:
      log = 'Debug'
      break
    case 1:
      log = 'Info'
      break
    case 2:
      log = 'Warn'
      break
    case 3:
      log = 'Error'
      break
    case 4:
      log = 'Fatal'
      break
    default:
      log = ''
      break
  }
  return log
}

// 格式化请求类型
// 0 GET,1 POST,2 PUT,3 DELETE
function formatRequestType(requestType) {
  let value = ''
  switch (requestType) {
    case 0:
      value = 'GET'
      break
    case 1:
      value = 'POST'
      break
    case 2:
      value = 'PUT'
      break
    case 3:
      value = 'DELETE'
      break

    default:
      value = ''
  }
  return value
}

// 格式化浏览器类型
// 客户端类型 10 Android,20 IOS, 30 IE ,31 FireFox,32 Opera ,33 Safari ,34 Chrome ,40 Service(系统服务)
function formatClientType(clientType) {
  let value = ''
  switch (clientType) {
    case 30:
      value = 'IE'
      break
    case 31:
      value = 'FireFox'
      break
    case 32:
      value = 'Opera'
      break
    case 33:
      value = 'Safari'
      break
    case 34:
      value = 'Chrome'
      break

    default:
      value = ''
      break
  }
  return value
}

// 格式化参数类型 0 int  1 String  2  boolean 3  double
function formatParamType(paramType) {
  let value = ''
  switch (paramType) {
    case 0:
      value = 'int'
      break
    case 1:
      value = 'String'
      break
    case 2:
      value = 'boolean'
      break
    case 3:
      value = 'double'
      break
    case 4:
      value = 'long'
      break
    default:
      value = ''
      break
  }
  return value
}
// 过滤掉 图片
function formatImg(text) {
  const reg = /<img[^>]*src[=\"\'\s]+[^\.]*\/([^\.]+)\.[^\"\']+[\"\']?[^>]*>/gi
  return text.replace(reg, '')
}

// 过滤掉 样式
function formatStyle(text) {
  const reg = /style\s*=\s*('[^']*'|\"[^\"]*\")/g
  return text.replace(reg, '')
}

// 格式化菜单是否显示  0 不显示     1 显示
function formatIsShow(isShow) {
  let value = ''
  switch (isShow) {
    case 0:
      value = '否'
      break
    case 1:
      value = '是'
      break
  }
  return value
}

// 三位加个小数点
function formatNumberThousands(num) {
  var result = []; var counter = 0
  num = (num || 0).toString().split('')
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result.unshift(num[i])
    if (!(counter % 3) && i !== 0) { result.unshift(',') }
  }
  return result.join('')
}

function formatTimeUnit(timeUnit) {
  let value = ''
  switch (timeUnit) {
    case 0:
      value = '分钟'
      break
    case 1:
      value = '小时'
      break
    default :
      return ''
  }
  return value
}

// storageUnitFormat 显示k m
function formatStorageUnit(num) {
  if (num < 1000) {
    return num
  }
  if (num < 1000 * 1000) {
    return (num / 1000).toFixed(0) + ' K'
  }
  if (num < 1000 * 1000 * 1000) {
    return (num / (1000 * 1000)).toFixed(0) + ' M'
  }
  if (num < 1000 * 1000 * 1000 * 1000) {
    return (num / (1000 * 1000 * 1000)).toFixed(0) + ' G'
  }
  if (num < 1000 * 1000 * 1000 * 1000 * 1000) {
    return (num / (1000 * 1000 * 1000 * 1000)).toFixed(0) + ' P'
  }
  return num
}

//
function formatSex(sex) {
  let value = ''
  switch (sex) {
    case 1:
      value = '男'
      break
    case 2:
      value = '女'
      break
    default :
      value = '保密'
  }
  return value
}

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 获得URL参数
function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {Sting} input value
 * @returns {number} output value
 */
function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
// 将json对象转换成url参数
function json2UrlParam(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}
// 将url参数 变成json对象
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
export default {
  install: function(vm) {
    vm.filter('formatDate', formatDate)
    vm.filter('formatTimeStamp', formatTimeStamp)
    vm.filter('formatTimeStampMinute', formatTimeStampMinute)
    vm.filter('formatLogLevel', formatLogLevel)
    vm.filter('formatRequestType', formatRequestType)
    vm.filter('formatClientType', formatClientType)
    vm.filter('formatParamType', formatParamType)
    vm.filter('formatIsShow', formatIsShow)
    vm.filter('formatNumberThousands', formatNumberThousands)
    vm.filter('formatTimeUnit', formatTimeUnit)
    vm.filter('formatImg', formatImg)
    vm.filter('formatStyle', formatStyle)
    vm.filter('formatStorageUnit', formatStorageUnit)
    vm.filter('formatSex', formatSex)
    vm.filter('parseTime', parseTime)
    vm.filter('formatTime', formatTime)
    vm.filter('getQueryObject', getQueryObject)
    vm.filter('byteLength', byteLength)
    vm.filter('json2UrlParam', json2UrlParam)
    vm.filter('param2Obj', param2Obj)
  }
}
