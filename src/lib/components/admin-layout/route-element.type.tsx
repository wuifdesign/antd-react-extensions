import React from 'react'
import { AuthLayoutProps } from './auth-layout/auth-layout'
import { DefaultLayoutProps } from './default-layout/default-layout'

type RouteElementBase = {
  path: string
  component: React.ElementType
  routes?: RouteElement[]
  exact?: boolean
  is404?: boolean
}

export type BlankRouteElement = RouteElementBase & {
  layout: 'blank'
}

export type DefaultRouteElement = RouteElementBase & {
  layout: 'default'
  breadcrumb: React.ReactNode | string
  layoutProps?: DefaultLayoutProps
}

export type AuthRouteElement = RouteElementBase & {
  layout: 'auth'
  layoutProps?: AuthLayoutProps
}

export type CustomLayoutRouteElement = RouteElementBase & {
  layout: React.ElementType
  layoutProps: Record<string, any>
}

export type RouteElement = BlankRouteElement | DefaultRouteElement | AuthRouteElement | CustomLayoutRouteElement
