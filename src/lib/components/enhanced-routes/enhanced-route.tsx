import React, { Suspense } from 'react'
import { EnhancedRouteType } from './enhanced-route.type'
import { ErrorBoundary } from '../error-boundary'
import { LoadingSpinner } from '../loading-spinner'
import { FCWithoutChildren } from '../..'

export type EnhancedRouteProps = {
  element?: React.ReactElement | null
  route: EnhancedRouteType
}

export const EnhancedRoute: FCWithoutChildren<EnhancedRouteProps> = ({ element, route }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
    </ErrorBoundary>
  )
}
