import * as React from 'react'
import { useContext } from 'react'
import { RouteElement } from './route-element.type'

export type LayoutContextType = {
  routes: RouteElement[]
  fullPageLoading: boolean
  setFullPageLoading: (isLoading: boolean) => void
}

export const LayoutContext = React.createContext<LayoutContextType>({
  routes: [],
  fullPageLoading: false,
  setFullPageLoading: () => null
})

export const useLayoutContext = () => useContext(LayoutContext)
