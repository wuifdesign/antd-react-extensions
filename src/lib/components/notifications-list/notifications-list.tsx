import React from 'react'
import { List, ListProps } from 'antd'

export type NotificationsListItem = {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  onClick?: () => void
}

export type NotificationsListProps = Omit<ListProps<NotificationsListItem>, 'dataSource' | 'renderItem'> & {
  dataSource: NotificationsListItem[]
  maxHeight?: number | string
  width?: number | string
}

/**
 * Wrapper around the antd list component to display notifications.
 */
export const NotificationsList: React.FC<NotificationsListProps> = ({
  dataSource,
  maxHeight = 400,
  width = 300,
  style,
  ...props
}) => {
  return (
    <List
      className="notification-list"
      bordered
      size="small"
      style={{ border: 0, maxHeight, width, ...style }}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          className="notification-list-element"
          onClick={() => {
            if (item.onClick) {
              item.onClick()
            }
          }}
        >
          <List.Item.Meta avatar={item.icon} title={item.title} description={item.description} />
        </List.Item>
      )}
      {...props}
    />
  )
}

export default NotificationsList
