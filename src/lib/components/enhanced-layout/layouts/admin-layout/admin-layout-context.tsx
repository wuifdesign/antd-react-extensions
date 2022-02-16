import * as React from 'react'
import { useContext, useState } from 'react'
import { useLocalStorage } from '../../../../utils/hooks/use-local-storage/use-local-storage'

export type AdminLayoutContextType = {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export const AdminLayoutContext = React.createContext<AdminLayoutContextType>({
  sidebarCollapsed: true,
  setSidebarCollapsed: () => null,
  mobileNavOpen: true,
  setMobileNavOpen: () => null
})

export type AdminLayoutProviderProps = {
  initialSidebarCollapsed?: boolean
}

export const AdminLayoutProvider: React.FC<AdminLayoutProviderProps> = ({
  initialSidebarCollapsed = false,
  children
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage(
    'default-layout-sidebar-collapsed',
    initialSidebarCollapsed,
    true
  )

  return (
    <AdminLayoutContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
        sidebarCollapsed,
        setSidebarCollapsed
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  )
}

export const useAdminLayoutContext = () => useContext(AdminLayoutContext)
