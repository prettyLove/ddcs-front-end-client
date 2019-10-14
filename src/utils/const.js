/**
 * 常用常量
 *
 */

const success = 0
const responseSuccess = 200
const fail = -1

export const $success = success
export const $fail = fail

// 星期
export const weekType = [
  { name: '星期一', value: 'Monday' },
  { name: '星期二', value: 'Tuesday' },
  { name: '星期三', value: 'Wednesday' },
  { name: '星期四', value: 'Thursday' },
  { name: '星期五', value: 'Friday' },
  { name: '星期六', value: 'Saturday' },
  { name: '星期天', value: 'Sunday' },
  { name: '工作日', value: 'workday' },
  { name: '双休日', value: 'weekday' },
  { name: '每天', value: 'everyday' },
  { name: '每周', value: 'everyweek' },
  { name: '每月', value: 'everymonth' }
]
export default {
  install: function(vm) {
    vm.prototype.$success = success
    vm.prototype.$responseSuccess = responseSuccess
    vm.prototype.$fail = fail
  }
}

