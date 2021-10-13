import * as React from 'react'
import { useContext, useState } from 'react'
import { useLocalStorage } from '../../../../utils/hooks/use-local-storage/use-local-storage'

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

export type DefaultLayoutProviderProps = {
  initialSidebarCollapsed?: boolean
}

export const DefaultLayoutProvider: React.FC<DefaultLayoutProviderProps> = ({
  initialSidebarCollapsed = false,
  children
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage(
    'default-layout-sidebar-collapsed',
    initialSidebarCollapsed
  )

  return (
    <DefaultLayoutContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
        sidebarCollapsed,
        setSidebarCollapsed
      }}
    >
      {children}
    </DefaultLayoutContext.Provider>
  )
}

export const useDefaultLayoutContext = () => useContext(DefaultLayoutContext)
