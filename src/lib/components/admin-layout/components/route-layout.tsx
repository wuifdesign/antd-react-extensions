import React, { useCallback, useLayoutEffect, useState } from 'react'
import { DefaultLayout, DefaultLayoutProps } from '../layouts/default-layout/default-layout'
import { AuthLayout, AuthLayoutProps } from '../layouts/auth-layout/auth-layout'
import { useLayoutContext } from '../layout-context'
import { BlankLayout } from '../layouts/blank-layout/blank-layout'
import { useLocation } from 'react-router-dom'
import { EnhancedRouteMatch, EnhancedRouteType, matchEnhancedRoutes } from '../../enhanced-routes'
import { Location } from 'history'
import { GuardWrapper } from '../../enhanced-routes/guard-wrapper'

export type RouteLayoutProps = {
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
  copyright?: React.ReactNode
}

const checkLayout = (guardWithLayout?: boolean, contextGuardWithLayout?: boolean) => {
  let calculatedGuardWithLayout = true
  if (guardWithLayout !== undefined) {
    calculatedGuardWithLayout = guardWithLayout
  } else if (contextGuardWithLayout !== undefined) {
    calculatedGuardWithLayout = contextGuardWithLayout
  }
  return calculatedGuardWithLayout
}

/*
const recursiveSearch = (children: React.ReactNode, displayName: string) => {
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child)) {
      console.log(child.type.displayName === displayName, child.type.displayName, displayName)
      if (child.type.displayName === displayName) {
        return true
      }
      if (child.props.children) {
        return recursiveSearch(child.props.children, displayName)
      }
    }
  }
  return false
}
*/

const getLayout = (route: EnhancedRouteType, guardHit: boolean = true, contextGuardWithLayout?: boolean) => {
  if (guardHit && !checkLayout(route.guardWithLayout, contextGuardWithLayout)) {
    return 'blank'
  }
  return route.layout || 'default'
}

export const RouteLayout: React.FC<RouteLayoutProps> = ({
  defaultLayoutProps,
  authLayoutProps,
  copyright,
  children
}) => {
  const { routes, guardWithLayout: contextGuardWithLayout } = useLayoutContext()
  const location = useLocation()
  const currentRoute = matchEnhancedRoutes(routes, location as Location).pop() as EnhancedRouteMatch
  const [layoutType, setLayoutType] = useState('blank')
  const guard = currentRoute.route.guard

  useLayoutEffect(() => {
    setLayoutType(getLayout(currentRoute.route, true, contextGuardWithLayout))
  }, [currentRoute.route, contextGuardWithLayout])

  const onRender = useCallback(() => {
    setLayoutType(getLayout(currentRoute.route, false, contextGuardWithLayout))
  }, [currentRoute.route, contextGuardWithLayout])

  let elements = children
  if (guard) {
    elements = React.cloneElement(guard, { children: <GuardWrapper onRender={onRender}>{elements}</GuardWrapper> })
  }

  if (layoutType === 'default') {
    return (
      <DefaultLayout menu={[]} logo={() => ''} copyright={copyright} {...defaultLayoutProps}>
        {elements}
      </DefaultLayout>
    )
  }

  if (layoutType === 'auth') {
    return (
      <AuthLayout logo={'PLACEHOLDER'} copyright={copyright} {...authLayoutProps}>
        {elements}
      </AuthLayout>
    )
  }

  return <BlankLayout>{elements}</BlankLayout>
}
