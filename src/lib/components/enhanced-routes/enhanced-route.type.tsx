import React from 'react'
import { RouteMatch } from 'react-router-dom'

export type EnhancedRouteLayoutType = 'default' | 'auth' | 'blank'

export type EnhancedRouteMatch<ParamKey extends string = string> = RouteMatch<ParamKey> & {
  route: EnhancedRouteType
}

export type EnhancedRouteType = {
  caseSensitive?: boolean
  children?: EnhancedRouteType[]
  element?: React.ReactElement | null
  index?: boolean
  path?: string
  layout?: EnhancedRouteLayoutType
  breadcrumb?: React.ReactNode | ((match: EnhancedRouteMatch) => React.ReactNode)
  is404?: boolean
  guard?: React.ReactElement | null
  guardWithLayout?: boolean
  meta?: any
}
