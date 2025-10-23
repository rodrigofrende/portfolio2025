import { createI18n } from 'vue-i18n'
import es from './locales/es'
import en from './locales/en'

// Get saved language from localStorage or use browser language
const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.split('-')[0]
const defaultLocale = savedLocale || (browserLocale === 'es' ? 'es' : 'en')

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    es: es as any,
    en: en as any
  }
})

export default i18n

