import { useContext } from 'react'
import { ConfigContext } from './config-provider'

export const useTheme = () => {
  const context = useContext(ConfigContext)
  return {
    css: context.css,
    setCss: context.setCss,
    cssVariables: context.cssVariables,
    setCssVariables: context.setCssVariables
  }
}

export default useTheme
