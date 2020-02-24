import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

type Props = {
  breadcrumbs: any[]
}

const DefaultLayoutBreadcrumbs: React.FC<Props> = ({ breadcrumbs }) => {
  let has404 = false
  breadcrumbs = breadcrumbs.filter((item) => {
    if (item.is404 && !has404) {
      has404 = !has404
      return true
    }
    if (typeof item.breadcrumb.type === 'function') {
      return !!item.breadcrumb.type(item)
    }
    return !item.is404
  })
  return (
    <Breadcrumb style={{ marginBottom: 12 }}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <Breadcrumb.Item key={match.url}>
          {index < breadcrumbs.length - 1 ? <Link to={match.url}>{breadcrumb}</Link> : breadcrumb}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default DefaultLayoutBreadcrumbs
