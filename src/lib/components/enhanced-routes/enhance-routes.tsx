import React from 'react'
import { RouteObject } from 'react-router-dom'
import { EnhancedRoute } from './enhanced-route'
import { EnhancedRouteType } from './enhanced-route.type'

export const enhanceRoutes = (routes: EnhancedRouteType[]): RouteObject[] => {
  return routes.map((route) => {
    const routeObject: RouteObject = {
      caseSensitive: route.caseSensitive,
      element: <EnhancedRoute route={route} element={route.element} />,
      index: route.index,
      path: route.path
    }
    if (route.children) {
      routeObject.children = enhanceRoutes(route.children)
    }
    return routeObject
  })
}
