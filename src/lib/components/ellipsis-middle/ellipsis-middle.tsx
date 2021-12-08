import React from 'react'
import { Typography } from 'antd'
import { FCRequiredChildren } from '../../utils'

const { Text } = Typography

export type EllipsisMiddleProps = {
  getTitle?: (content: string) => string | undefined
  suffixCount: number
}

/**
 * You can ellipsis in middle of string (https://ant.design/components/typography/#components-typography-demo-ellipsis-middle).
 */
export const EllipsisMiddle: FCRequiredChildren<EllipsisMiddleProps, string> = ({
  suffixCount,
  getTitle = (content) => content,
  children
}) => {
  if (!children || typeof children !== 'string') {
    return null
  }
  const start = children.slice(0, children.length - suffixCount).trim()
  const suffix = children.slice(-suffixCount).trim()
  return (
    <Text style={{ maxWidth: '100%' }} ellipsis={{ suffix }} title={getTitle(children)}>
      {start}
    </Text>
  )
}
