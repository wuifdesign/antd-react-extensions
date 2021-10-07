import { useContext } from 'react'
import { ConfigContext } from './config-provider'

export const useIsMobile = () => {
  return useContext(ConfigContext).isMobile
}
