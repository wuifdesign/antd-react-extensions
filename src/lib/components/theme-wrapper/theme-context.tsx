import React, { useContext } from 'react'

export type CssVariablesType = Record<string, string>

export type ThemeContextType = {
  css: string | undefined
  setCss: (css: string) => void
  cssVariables: CssVariablesType
  setCssVariables: (cssVariables: CssVariablesType) => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  css: undefined,
  setCss: () => null,
  cssVariables: {},
  setCssVariables: () => null
})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  return {
    css: context.css,
    setCss: context.setCss,
    cssVariables: context.cssVariables,
    setCssVariables: context.setCssVariables
  }
}
