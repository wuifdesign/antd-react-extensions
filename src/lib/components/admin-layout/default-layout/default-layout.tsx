import React, { useCallback, useMemo, useState } from 'react'
import { Layout } from 'antd'
import withBreadcrumbs, { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc'
import { useIsMobile } from '../../../utils/hooks/use-is-mobile'
import DefaultLayoutBreadcrumbs from './default-layout-breadcrumbs'
import DefaultLayoutSidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from './default-layout-sidebar'
import DefaultLayoutHeader from './default-layout-header'
import { MenuElement } from '../menu-element.type'
import { RouteElement } from '../route-element.type'
import { DefaultLayoutContext } from './default-layout-context'
import { useBodyClass } from '../../../utils/hooks/use-body-class'
import { PAGE_PADDING } from '../admin-layout-config'

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
  routes,
  menu,
  hideFrame = false,
  hideBreadcrumbs = false,
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

  const BreadCrumbs = useMemo(
    () => withBreadcrumbs(routes as BreadcrumbsRoute[], { disableDefaults: true })(DefaultLayoutBreadcrumbs),
    [routes]
  )

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
        className="ant-layout-content"
        style={{
          marginTop: hideFrame ? 0 : undefined,
          marginLeft: isMobile ? 0 : currentSidebarWidth,
          padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING
        }}
      >
        {!hideBreadcrumbs && <BreadCrumbs />}
        {children}
      </Layout>
    </DefaultLayoutContext.Provider>
  )
}
