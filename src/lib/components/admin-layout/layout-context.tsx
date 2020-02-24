import * as React from 'react'
import { useContext } from 'react'

export type LayoutContextType = {
  fullPageLoading: boolean
  setFullPageLoading: (isLoading: boolean) => void
}

export const LayoutContext = React.createContext<LayoutContextType>({
  fullPageLoading: false,
  setFullPageLoading: () => null
})

export const useLayoutContext = () => useContext(LayoutContext)
