import React from 'react'
import { Badge, Popover, PopoverProps } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { Button } from '../button'
import { NotificationsList } from '../notifications-list'
import { NotificationsListProps } from '../notifications-list/notifications-list'
import { FCWithoutChildren } from '../../utils'
import { HtmlDataProps } from '../../utils/types/html-data-props.type'

export type NotificationsPopoverProps = {
  count?: number
  dot?: boolean
  icon?: React.ReactNode
  notificationListProps: NotificationsListProps & HtmlDataProps
  popoverProps?: PopoverProps & HtmlDataProps
}

/**
 * Wrapper around the antd list component to display notifications.
 */
export const NotificationsPopover: FCWithoutChildren<NotificationsPopoverProps> = ({
  dot,
  count,
  icon = <BellOutlined />,
  popoverProps,
  notificationListProps
}) => {
  return (
    <Popover
      placement="bottomRight"
      overlayClassName="notifications-popover"
      overlayInnerStyle={{ padding: 0 }}
      content={<NotificationsList width={300} {...notificationListProps} />}
      {...popoverProps}
    >
      <Button style={{ height: 'auto' }} type="text">
        <Badge dot={dot} count={count} size="small">
          {icon}
        </Badge>
      </Button>
    </Popover>
  )
}
