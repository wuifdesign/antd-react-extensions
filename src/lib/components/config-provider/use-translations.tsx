import { useContext } from 'react'
import { TranslationsType } from './default-translations'
import { ConfigContext } from './config-provider'

const useTranslations = (): TranslationsType => {
  const { translations } = useContext(ConfigContext)
  return translations as TranslationsType
}

export default useTranslations
