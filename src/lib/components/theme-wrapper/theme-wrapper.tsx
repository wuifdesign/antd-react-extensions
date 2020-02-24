import React, { useState } from 'react'
import { CssVariablesType, ThemeContext } from './theme-context'

const mapCssVariables = (cssVariables: CssVariablesType) => {
  const lines: string[] = []
  for (const key of Object.keys(cssVariables)) {
    lines.push(`${key}:${cssVariables[key]}`)
  }
  return lines.join(';')
}

const ThemeWrapper: React.FC = ({ children }) => {
  const [css, setCss] = useState<string>()
  const [cssVariables, setCssVariables] = useState<CssVariablesType>({})

  return (
    <ThemeContext.Provider value={{ cssVariables, setCssVariables, css, setCss }}>
      {!!Object.keys(cssVariables).length && <style>{`:root {${mapCssVariables(cssVariables)}}`}</style>}
      {!!css && <style>{css}</style>}
      <div className="app">{children}</div>
    </ThemeContext.Provider>
  )
}

export default ThemeWrapper
