import React, { useMemo } from 'react'
import { useLayoutContext } from '../admin-layout'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { createStyleMap } from '../../utils/create-style-map/create-style-map'
import { matchEnhancedRoutes } from '../enhanced-routes/match-enhance-routes'

type BreadcrumbElement = {
  link: string
  element: React.ReactNode
}

const styles = createStyleMap({
  breadcrumb: { fontWeight: 'normal' }
})

const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const { routes } = useLayoutContext()

  const breadcrumbs = useMemo(() => {
    const fullBreadcrumbs = matchEnhancedRoutes(routes, location)
    const temp: BreadcrumbElement[] = []
    if (fullBreadcrumbs) {
      for (const route of fullBreadcrumbs) {
        const { breadcrumb } = route.route
        if (breadcrumb) {
          temp.push({
            link: route.pathname,
            element: typeof breadcrumb === 'function' ? breadcrumb(route) : breadcrumb
          })
        }
        if (route.route.is404) {
          break
        }
      }
    }
    return temp
  }, [routes, location])

  if (breadcrumbs.length) {
    return (
      <Breadcrumb style={styles.breadcrumb}>
        {breadcrumbs.map(({ link, element }, index) => (
          <Breadcrumb.Item key={link}>
            {index < breadcrumbs.length - 1 ? <Link to={link}>{element}</Link> : element}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }

  return null
}

export { Breadcrumbs }
