import React, { useCallback, useState } from 'react'
import { Layout } from 'antd'
import { useIsMobile } from '../../../utils/hooks/use-is-mobile'
import DefaultLayoutSidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from './default-layout-sidebar'
import DefaultLayoutHeader from './default-layout-header'
import { MenuElement } from '../menu-element.type'
import { RouteElement } from '../route-element.type'
import { DefaultLayoutContext } from './default-layout-context'
import { useBodyClass } from '../../../utils/hooks/use-body-class'
import clsx from 'clsx'

export type DefaultLayoutProps = {
  menu: MenuElement[]
  logo: (type: 'default' | 'mobile' | 'collapsed') => React.ReactNode | string
  sidebarTheme?: 'light' | 'dark'
  hideFrame?: boolean
  hideBreadcrumbs?: boolean
  sidebarWidth?: number
  sidebarCollapsedWidth?: number
  sidebarMenuPrepend?: (collapsed: boolean) => React.ReactNode | string
  sidebarMenuAppend?: (collapsed: boolean) => React.ReactNode | string
  sidebarBottom?: (collapsed: boolean) => React.ReactNode | string
  headerRight?: React.ReactElement
}

export type DefaultLayoutPropsInternal = DefaultLayoutProps & {
  routes: RouteElement[]
}

export const DefaultLayout: React.FC<DefaultLayoutPropsInternal> = ({
  logo,
  menu,
  hideFrame = false,
  sidebarMenuPrepend,
  sidebarMenuAppend,
  sidebarBottom,
  sidebarTheme = 'light',
  headerRight,
  sidebarWidth = SIDEBAR_WIDTH,
  sidebarCollapsedWidth = SIDEBAR_COLLAPSED_WIDTH,
  children
}) => {
  useBodyClass('default-layout')

  const isMobile = useIsMobile()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const setMobileNavOpenFunction = useCallback((open) => setMobileNavOpen(open), [])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const setSidebarCollapsedFunction = useCallback((open) => setSidebarCollapsed(open), [])

  let currentSidebarWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth
  if (hideFrame) {
    currentSidebarWidth = 0
  }

  return (
    <DefaultLayoutContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen: setMobileNavOpenFunction,
        sidebarCollapsed: sidebarCollapsed,
        setSidebarCollapsed: setSidebarCollapsedFunction
      }}
    >
      {!hideFrame && (
        <>
          <DefaultLayoutSidebar
            logo={logo('default')}
            logoCollapsed={logo('collapsed')}
            menu={menu}
            sidebarTheme={sidebarTheme}
            sidebarWidth={sidebarWidth}
            sidebarCollapsedWidth={sidebarCollapsedWidth}
            menuAppend={sidebarMenuAppend?.(sidebarCollapsed)}
            menuPrepend={sidebarMenuPrepend?.(sidebarCollapsed)}
            sidebarBottom={sidebarBottom?.(sidebarCollapsed)}
          />
          <DefaultLayoutHeader
            logoMobile={logo('mobile')}
            headerRight={headerRight}
            sidebarWidth={sidebarWidth}
            sidebarCollapsedWidth={sidebarCollapsedWidth}
          />
        </>
      )}

      <Layout
        className={clsx('ant-layout-content', isMobile && 'ant-layout-content-mobile')}
        style={{
          marginTop: hideFrame ? 0 : undefined,
          marginLeft: isMobile ? 0 : currentSidebarWidth
        }}
      >
        {children}
      </Layout>
    </DefaultLayoutContext.Provider>
  )
}
