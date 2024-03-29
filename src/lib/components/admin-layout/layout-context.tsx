import * as React from 'react'
import { useContext } from 'react'
import { EnhancedRouteType } from '../enhanced-routes/enhanced-route.type'

export type LayoutContextType = {
  routes: EnhancedRouteType[]
  guardWithLayout: boolean
  fullPageLoading: string | boolean
  setFullPageLoading: (isLoading: string | boolean) => void
}

export const LayoutContext = React.createContext<LayoutContextType>({
  routes: [],
  guardWithLayout: true,
  fullPageLoading: false,
  setFullPageLoading: () => null
})

export const useLayoutContext = () => useContext(LayoutContext)
