import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCnLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementZhTwLocale from 'element-ui/lib/locale/lang/zh-TW' // element-ui lang
import enLocale from './en-US'
import zhCNLocale from './zh-CN'
import zhTWLocale from './zh-TW'

Vue.use(VueI18n)

const messages = {
  en_US: {
    ...enLocale,
    ...elementEnLocale
  },
  zh_CN: {
    ...zhCNLocale,
    ...elementZhCnLocale
  },
  zh_TW: {
    ...zhTWLocale,
    ...elementZhTwLocale
  }
}

const i18n = new VueI18n({
  // set locale
  locale: Cookies.get('language') || 'zh_CN',
  // set locale messages
  messages
})

export default i18n
