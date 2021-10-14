import React, { Suspense, useEffect, useState } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { ErrorBoundary } from '../../error-boundary/error-boundary'
import { RouteElementType } from '../route-element.type'
import { ErrorPage } from '../../error-page'
import { LoadingSpinner } from '../../loading-spinner'
import { CanActivateFallbackType } from '../admin-layout'
import { useLayoutContext } from '../layout-context'

export type RouteElementProps = RouteElementType & {
  canActivateFallbackBase?: CanActivateFallbackType
}

export const RouteElement: React.FC<RouteElementProps> = ({ canActivateFallbackBase, ...route }) => {
  const { setLayoutType } = useLayoutContext()
  const [withLayout, setWithLayout] = useState(true)

  useEffect(() => {
    if (withLayout) {
      if (route.layout === 'blank') {
        setLayoutType('blank')
      } else if (route.layout === 'auth') {
        setLayoutType('auth')
      } else if (route.layout === 'default' || !route.layout) {
        setLayoutType('default')
      } else {
        throw new Error(`'Layout with name ${route.layout} not supported!`)
      }
    } else {
      setLayoutType(null)
    }
  }, [setLayoutType, route.layout, withLayout])

  let tempWithLayout = true
  const canActivate = route.canActivate ? route.canActivate(route) : true
  if (!canActivate) {
    if (canActivateFallbackBase) {
      tempWithLayout = canActivateFallbackBase.renderLayout === true
    }
    if (route.canActivateFallback) {
      tempWithLayout = route.canActivateFallback.renderLayout === true
    }
  }

  if (tempWithLayout !== withLayout) {
    setWithLayout(tempWithLayout)
  }

  const routeFallback = route.canActivateFallback?.component || canActivateFallbackBase?.component || (
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

  return <Route path={route.path} exact={route.exact} render={(props) => routeElement(props)} />
}
