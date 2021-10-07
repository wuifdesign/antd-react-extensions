import React, { Suspense } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { ErrorBoundary } from '../../error-boundary/error-boundary'
import { CustomLayoutRouteElement } from '../route-element.type'
import { ErrorPage } from '../../error-page'
import { LoadingSpinner } from '../../loading-spinner'

export const RouteWithSubRoutes = (route: CustomLayoutRouteElement) => {
  let withLayout = true
  const canActivate = route.canActivate ? route.canActivate(route) : true
  if (!canActivate) {
    if (route.canActivateFallbackBase) {
      withLayout = route.canActivateFallbackBase.renderLayout === true
    }
    if (route.canActivateFallback) {
      withLayout = route.canActivateFallback.renderLayout === true
    }
  }
  const routeFallback = route.canActivateFallback?.component ?? route.canActivateFallbackBase?.component ?? (
    <ErrorPage type={403} />
  )
  const routeElement = (props: RouteComponentProps<any>) => {
    if (typeof canActivate === 'undefined') {
      return <LoadingSpinner />
    }
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {canActivate ? <route.component {...props} routes={route.routes} /> : routeFallback}
        </Suspense>
      </ErrorBoundary>
    )
  }

  return (
    <Route
      path={route.path}
      exact={!!route.exact}
      render={(props) => (
        <>
          {withLayout ? <route.layout {...route.layoutProps}>{routeElement(props)}</route.layout> : routeElement(props)}
        </>
      )}
    />
  )
}
