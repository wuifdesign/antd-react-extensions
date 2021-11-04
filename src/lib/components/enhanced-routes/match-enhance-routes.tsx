import { matchRoutes, RouteObject } from 'react-router-dom'
import { EnhancedRouteMatch } from './enhanced-route.type'
import { Location } from 'history'

export const matchEnhancedRoutes = (
  routes: RouteObject[],
  locationArg: Partial<Location> | string,
  basename?: string
) => {
  return matchRoutes(routes, locationArg, basename) as EnhancedRouteMatch[]
}
