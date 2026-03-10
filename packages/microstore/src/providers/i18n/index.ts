import { use } from "i18next"
import { initReactI18next } from "react-i18next"

import translationDE from "#locales/de.json"
import translationEN from "#locales/en.json"
import translationES from "#locales/es.json"
import translationFR from "#locales/fr.json"
import translationHR from "#locales/hr.json"
import translationHU from "#locales/hu.json"
import translationIT from "#locales/it.json"
import translationNL from "#locales/nl.json"
import translationPL from "#locales/pl.json"
import translationPT from "#locales/pt.json"
import translationSL from "#locales/sl.json"

export const I18N_PREFIX = "microstore_i18n"
export const FALLBACK_LANGUAGE = "en"
const resources = {
  de: {
    translation: translationDE,
  },
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  hr: {
    translation: translationHR,
  },
  hu: {
    translation: translationHU,
  },
  it: {
    translation: translationIT,
  },
  nl: {
    translation: translationNL,
  },
  pl: {
    translation: translationPL,
  },
  pt: {
    translation: translationPT,
  },
  sl: {
    translation: translationSL,
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
