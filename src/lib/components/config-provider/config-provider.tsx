import React, { useMemo, useState } from 'react'
import { defaultTranslations, PartialTranslationsType, TranslationsType } from './default-translations'
import deepmerge from 'deepmerge'

export type CssVariablesType = Record<string, string>

export type ConfigContextType = {
  translations: PartialTranslationsType
  css: string | undefined
  setCss: (css: string) => void
  cssVariables: CssVariablesType
  setCssVariables: (cssVariables: CssVariablesType) => void
}

export const ConfigContext = React.createContext<ConfigContextType>({
  translations: defaultTranslations,
  css: undefined,
  setCss: () => null,
  cssVariables: {},
  setCssVariables: () => null
})

export type ConfigProviderProps = {
  translations?: PartialTranslationsType
}

const mapCssVariables = (cssVariables: CssVariablesType) => {
  const lines: string[] = []
  for (const key of Object.keys(cssVariables)) {
    lines.push(`${key}:${cssVariables[key]}`)
  }
  return lines.join(';')
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ translations = {}, children }) => {
  const [css, setCss] = useState<string>()
  const [cssVariables, setCssVariables] = useState<CssVariablesType>({})
  translations = useMemo(() => deepmerge(defaultTranslations, translations) as TranslationsType, [translations])

  return (
    <ConfigContext.Provider value={{ cssVariables, setCssVariables, css, setCss, translations }}>
      {!!Object.keys(cssVariables).length && <style>{`:root {${mapCssVariables(cssVariables)}}`}</style>}
      {!!css && <style>{css}</style>}
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider
