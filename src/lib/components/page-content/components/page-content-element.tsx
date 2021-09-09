import React, { useCallback, useState } from 'react'
import { CollapseContainer } from '../../collapse-container'
import { DownOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { LoadingSpinner } from '../../loading-spinner'

export type PageContentElementProps = {
  title?: React.ReactNode
  style?: React.CSSProperties
  subTitle?: React.ReactNode
  extra?: React.ReactNode
  type?: 'primary' | 'success' | 'error' | 'warning'
  loading?: boolean
  collapsable?: boolean
  initialCollapsed?: boolean
  removeBodyPadding?: true
}

export const PageContentElement: React.FC<PageContentElementProps> = ({
  title,
  subTitle,
  extra,
  style,
  collapsable,
  type,
  loading = false,
  initialCollapsed = false,
  removeBodyPadding,
  children
}) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const hasHead = title || subTitle || extra || collapsable

  const toggleCollapse = useCallback(() => {
    if (collapsable) {
      setCollapsed((c) => !c)
    }
  }, [collapsable])

  const bodyElement = loading ? (
    <LoadingSpinner marginVertical={30} />
  ) : (
    <div className="page-content-element-body " style={{ padding: removeBodyPadding ? 0 : undefined }}>
      {children}
    </div>
  )

  return (
    <div
      style={style}
      className={clsx('page-content-element', type && `page-content-type-${type}`, {
        collapsable,
        collapsed,
        'has-head': hasHead
      })}
    >
      {hasHead && (
        <div className="page-content-element-head" onClick={toggleCollapse}>
          <div className="page-content-element-title">
            {title && <div className="page-content-title">{title}</div>}
            {subTitle && <div className="page-content-element-title-sub">{subTitle}</div>}
          </div>
          <div className="page-content-element-extra" onClick={(e) => e.stopPropagation()}>
            {extra}
          </div>
          {collapsable && (
            <div style={{ marginLeft: 16 }}>
              <DownOutlined style={{ transform: collapsed ? 'rotate(-90deg)' : undefined, transition: 'all .2s' }} />
            </div>
          )}
        </div>
      )}
      {collapsable ? <CollapseContainer isOpened={!collapsed}>{bodyElement}</CollapseContainer> : bodyElement}
    </div>
  )
}
