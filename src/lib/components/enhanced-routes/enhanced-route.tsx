import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { useLayoutContext } from '../admin-layout'
import { GuardWrapper } from './guard-wrapper'
import { EnhancedRouteType } from './enhanced-route.type'
import { ErrorBoundary } from '../error-boundary'
import { LoadingSpinner } from '../loading-spinner'

export type EnhancedRouteProps = {
  element?: React.ReactElement | null
  route: EnhancedRouteType
  guard?: React.ReactElement | null
  guardWithLayout?: boolean
}

export const EnhancedRoute: React.FC<EnhancedRouteProps> = ({ element, route, guard, guardWithLayout }) => {
  const { guardWithLayout: contextGuardWithLayout } = useLayoutContext()
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

  const onRender = useCallback(() => {
    let calculatedGuardWithLayout = true
    if (guardWithLayout !== undefined) {
      calculatedGuardWithLayout = guardWithLayout
    } else if (contextGuardWithLayout !== undefined) {
      calculatedGuardWithLayout = contextGuardWithLayout
    }
    setWithLayout(calculatedGuardWithLayout)
  }, [setWithLayout, guardWithLayout, contextGuardWithLayout])

  const enhancedElement = (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
    </ErrorBoundary>
  )

  if (guard) {
    return React.cloneElement(guard, { children: <GuardWrapper onRender={onRender}>{enhancedElement}</GuardWrapper> })
  }
  return <>{enhancedElement}</>
}
