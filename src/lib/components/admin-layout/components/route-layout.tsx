import React from 'react'
import { DefaultLayout, DefaultLayoutProps } from '../layouts/default-layout/default-layout'
import { AuthLayout, AuthLayoutProps } from '../layouts/auth-layout/auth-layout'
import { useLayoutContext } from '../layout-context'
import { BlankLayout } from '../layouts/blank-layout/blank-layout'

export type RouteLayoutType = 'default' | 'auth' | 'blank' | null

export type RouteLayoutProps = {
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
  copyright?: React.ReactNode
}

export const RouteLayout: React.FC<RouteLayoutProps> = ({
  defaultLayoutProps,
  authLayoutProps,
  copyright,
  children
}) => {
  const { layoutType } = useLayoutContext()

  if (layoutType === 'default') {
    return (
      <DefaultLayout menu={[]} logo={() => 'LOGO'} copyright={copyright} {...defaultLayoutProps}>
        {children}
      </DefaultLayout>
    )
  }

  if (layoutType === 'auth') {
    return (
      <AuthLayout logo={'LOGO'} copyright={copyright} {...authLayoutProps}>
        {children}
      </AuthLayout>
    )
  }

  return <BlankLayout>{children}</BlankLayout>
}
