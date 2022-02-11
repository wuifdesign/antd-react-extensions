import React from 'react'
import { Col, List, ListProps, Row } from 'antd'
import { FCWithoutChildren } from '../..'

export type NotificationsListItemType = {
  icon?: React.ReactNode
  date?: React.ReactNode
  title?: React.ReactNode
  read?: boolean
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  description?: React.ReactNode
  onClick?: () => void
}

export type NotificationsListProps = Omit<ListProps<NotificationsListItemType>, 'dataSource' | 'renderItem'> & {
  dataSource: NotificationsListItemType[]
  maxHeight?: number | string
  width?: number | string
}

/**
 * Wrapper around the antd list component to display notifications.
 */
export const NotificationsList: FCWithoutChildren<NotificationsListProps> = ({
  dataSource,
  maxHeight = 400,
  width,
  style,
  ...props
}) => {
  return (
    <>
      <List
        className="notification-list"
        bordered
        size="small"
        style={{ border: 0, maxHeight, width, ...style }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            className={`notification-list-element notification-list-element-${item.type || 'default'} ${
              !!item.read && 'notification-list-element-read'
            }`}
            onClick={() => {
              if (item.onClick) {
                item.onClick()
              }
            }}
          >
            {!!item.icon && <div className="notification-list-icon">{item.icon}</div>}
            <div style={{ flex: 1 }}>
              <Row>
                <Col flex={1}>{!!item.title && <div className="notification-list-title">{item.title}</div>}</Col>
                <Col>{!!item.date && <div className="notification-list-date">{item.date}</div>}</Col>
              </Row>
              {!!item.description && <div className="notification-list-description">{item.description}</div>}
            </div>
          </List.Item>
        )}
        {...props}
      />
    </>
  )
}
