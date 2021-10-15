import React from 'react'
import { Switch } from 'react-router-dom'
import { RouteElementType } from '../admin-layout'
import { RouteElement } from './components/route-element'
import { CanActivateFallbackType } from './can-activate-fallback.type'

export type DynamicRoutesProps = {
  routes: RouteElementType[]
  canActivateFallback?: CanActivateFallbackType
}

export const DynamicRoutes: React.FC<DynamicRoutesProps> = ({ routes, canActivateFallback }) => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteElement key={i} canActivateFallbackBase={canActivateFallback} {...route} />
      ))}
    </Switch>
  )
}
