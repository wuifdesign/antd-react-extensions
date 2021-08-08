import { useContext, useMemo } from 'react'
import { defaultTranslations, TranslationsType } from './default-translations'
import { ConfigContext } from './config-provider'
import deepmerge from 'deepmerge'

const useTranslations = (): TranslationsType => {
  const { translations } = useContext(ConfigContext)
  return useMemo(() => deepmerge(defaultTranslations, translations) as TranslationsType, [translations])
}

export default useTranslations
