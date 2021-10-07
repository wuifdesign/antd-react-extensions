import React, { useEffect, useMemo, useState } from 'react'
import { defaultTranslations, PartialTranslationsType, TranslationsType } from './default-translations'
import deepmerge from 'deepmerge'

const IS_MOBILE_BREAKPOINT = 850

export type CssVariablesType = Record<string, string>

export type ConfigContextType = {
  translations: PartialTranslationsType
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
  isMobileBreakpoint?: number
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
  isMobileBreakpoint = IS_MOBILE_BREAKPOINT,
  children
}) => {
  const [css, setCss] = useState<string>()
  const [cssVariables, setCssVariables] = useState<CssVariablesType>({})
  const [isMobile, setIsMobile] = useState(window.innerWidth <= isMobileBreakpoint)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= isMobileBreakpoint)
    }
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobileBreakpoint])

  translations = useMemo(() => deepmerge(defaultTranslations, translations) as TranslationsType, [translations])

  return (
    <ConfigContext.Provider value={{ cssVariables, isMobile, setCssVariables, css, setCss, translations }}>
      {!!Object.keys(cssVariables).length && <style>{`:root {${mapCssVariables(cssVariables)}}`}</style>}
      {!!css && <style>{css}</style>}
      {children}
    </ConfigContext.Provider>
  )
}
