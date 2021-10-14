import * as React from 'react'
import { useContext } from 'react'
import { RouteElementType } from './route-element.type'
import { RouteLayoutType } from './components/route-layout'

export type LayoutContextType = {
  routes: RouteElementType[]
  fullPageLoading: boolean
  setFullPageLoading: (isLoading: boolean) => void
  layoutType: RouteLayoutType
  setLayoutType: (layoutType: RouteLayoutType) => void
}

export const LayoutContext = React.createContext<LayoutContextType>({
  routes: [],
  fullPageLoading: false,
  setFullPageLoading: () => null,
  layoutType: null,
  setLayoutType: () => null
})

export const useLayoutContext = () => useContext(LayoutContext)
