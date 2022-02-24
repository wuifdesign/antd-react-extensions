import React, { useEffect, useMemo, useState } from 'react'
import { defaultTranslations, PartialTranslationsType, TranslationsType } from './default-translations'
import deepmerge from 'deepmerge'

export type CssVariablesType = Record<string, string>

export type ConfigContextType = {
  translations: TranslationsType
  isMobile: boolean
  css: string | undefined
  setCss: (css: string) => void
  cssVariables: CssVariablesType
  setCssVariables: (cssVariables: CssVariablesType) => void
}

export const ConfigContext = React.createContext<ConfigContextType>({
  translations: defaultTranslations,
  isMobile: false,
  css: undefined,
  setCss: () => null,
  cssVariables: {},
  setCssVariables: () => null
})

export type ConfigProviderProps = {
  translations?: PartialTranslationsType
  mobileBreakpoint?: number
}

const mapCssVariables = (cssVariables: CssVariablesType) => {
  const lines: string[] = []
  for (const key of Object.keys(cssVariables)) {
    lines.push(`${key}:${cssVariables[key]}`)
  }
  return lines.join(';')
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  translations = {},
  mobileBreakpoint = 850,
  children
}) => {
  const [css, setCss] = useState<string>()
  const [cssVariables, setCssVariables] = useState<CssVariablesType>({})
  const [isMobile, setIsMobile] = useState(window && window.innerWidth <= mobileBreakpoint)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint)
    }
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [mobileBreakpoint])

  const mergedTranslations: TranslationsType = useMemo(
    () => deepmerge(defaultTranslations, translations) as TranslationsType,
    [translations]
  )

  const cssVariablesStyleTag = useMemo(() => {
    return Object.keys(cssVariables).length > 0 ? <style>{`:root {${mapCssVariables(cssVariables)}}`}</style> : null
  }, [cssVariables])

  return (
    <ConfigContext.Provider
      value={{ cssVariables, isMobile, setCssVariables, css, setCss, translations: mergedTranslations }}
    >
      {cssVariablesStyleTag}
      {!!css && <style>{css}</style>}
      {children}
    </ConfigContext.Provider>
  )
}
