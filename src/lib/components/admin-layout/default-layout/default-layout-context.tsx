import * as React from 'react'

export type AdminLayoutContextType = {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export const DefaultLayoutContext = React.createContext<AdminLayoutContextType>({
  sidebarCollapsed: true,
  setSidebarCollapsed: () => null,
  mobileNavOpen: true,
  setMobileNavOpen: () => null
})
