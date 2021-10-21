import React, { useMemo } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { createStyleMap } from '../../utils/create-style-map/create-style-map'

type Props = {
  breadcrumbs: any[]
}

const styles = createStyleMap({
  breadcrumb: { fontWeight: 'normal' }
})

const BreadcrumbDisplay: React.FC<Props> = ({ breadcrumbs }) => {
  breadcrumbs = useMemo(() => {
    let has404 = false
    return breadcrumbs.filter((item) => {
      if (item.is404 && !has404) {
        has404 = !has404
        return true
      }
      if (typeof item.breadcrumb.type === 'function') {
        return !!item.breadcrumb.type(item)
      }
      return !item.is404
    })
  }, [breadcrumbs])
  return (
    <Breadcrumb style={styles.breadcrumb}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <Breadcrumb.Item key={match.url}>
          {index < breadcrumbs.length - 1 ? <Link to={match.url}>{breadcrumb}</Link> : breadcrumb}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default BreadcrumbDisplay
