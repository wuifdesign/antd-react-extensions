import React, { useMemo } from 'react'
import withBreadcrumbs, { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc'
import { useLayoutContext } from '../admin-layout'
import BreadcrumbDisplay from './breadcrumb-display'

const Breadcrumbs: React.FC = () => {
  const { routes } = useLayoutContext()

  const EnhancedBreadCrumbs = useMemo(
    () => withBreadcrumbs(routes as BreadcrumbsRoute[], { disableDefaults: true })(BreadcrumbDisplay),
    [routes]
  )

  return <EnhancedBreadCrumbs />
}

export default Breadcrumbs
