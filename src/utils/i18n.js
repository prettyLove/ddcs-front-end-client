import Cookies from 'js-cookie'

const LanguageKey = 'DDCS-language'

export function getLanguage() {
  return Cookies.get(LanguageKey)
}

export function setLanguage(language) {
  return Cookies.set(LanguageKey, language)
}

export function removeLanguage() {
  return Cookies.remove(LanguageKey)
}

// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
