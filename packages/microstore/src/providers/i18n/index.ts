import { use } from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "#locales/en.json"
import translationIT from "#locales/it.json"

export const I18N_PREFIX = "microstore_i18n"
export const FALLBACK_LANGUAGE = "en"
const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
}

const i18n = use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: FALLBACK_LANGUAGE, // if you're using a language detector, do not define the lng option
    fallbackLng: FALLBACK_LANGUAGE,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
