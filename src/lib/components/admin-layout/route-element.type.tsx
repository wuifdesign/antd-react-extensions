import React from 'react'
import { AuthLayoutProps } from './auth-layout/auth-layout'
import { DefaultLayoutProps } from './default-layout/default-layout'
import { CanActivateFallbackType } from './admin-layout'
import { match as MatchType } from 'react-router-dom'
import { Location } from 'history'

export type BreadcrumbItemType = {
  component: React.ReactNode
  exact: boolean
  layout: string
  location: Location
  match: MatchType
}

type RouteElementBase = {
  path: string
  component: React.ElementType
  routes?: RouteElement[]
  exact?: boolean
  is404?: boolean
  canActivate?: (route: RouteElement) => boolean | undefined
  canActivateFallback?: CanActivateFallbackType
}

export type BlankRouteElement = RouteElementBase & {
  layout: 'blank'
}

export type DefaultRouteElement = RouteElementBase & {
  layout: 'default'
  breadcrumb: React.ReactNode | ((item: BreadcrumbItemType) => React.ReactNode)
  layoutProps?: DefaultLayoutProps
}

export type AuthRouteElement = RouteElementBase & {
  layout: 'auth'
  layoutProps?: AuthLayoutProps
}

export type CustomLayoutRouteElement = RouteElementBase & {
  layout: React.ElementType
  layoutProps: Record<string, any>
  canActivateFallbackBase?: CanActivateFallbackType
}

export type RouteElement = BlankRouteElement | DefaultRouteElement | AuthRouteElement | CustomLayoutRouteElement
