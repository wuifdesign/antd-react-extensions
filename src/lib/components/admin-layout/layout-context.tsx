import * as React from 'react'
import { useContext } from 'react'
import { RouteLayoutType } from './components/route-layout'
import { EnhancedRouteType } from '../enhanced-routes/enhanced-route.type'

export type LayoutContextType = {
  routes: EnhancedRouteType[]
  guardWithLayout: boolean
  fullPageLoading: boolean
  setFullPageLoading: (isLoading: boolean) => void
  layoutType: RouteLayoutType
  setLayoutType: (layoutType: RouteLayoutType) => void
}

export const LayoutContext = React.createContext<LayoutContextType>({
  routes: [],
  guardWithLayout: true,
  fullPageLoading: false,
  setFullPageLoading: () => null,
  layoutType: null,
  setLayoutType: () => null
})

export const useLayoutContext = () => useContext(LayoutContext)
