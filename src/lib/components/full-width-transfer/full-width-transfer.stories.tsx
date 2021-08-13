import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { FullWidthTransfer } from './full-width-transfer'
import { TransferProps } from 'antd'

export default {
  component: FullWidthTransfer,
  title: 'Components/Full Width Transfer'
} as Meta

const data = [
  {
    key: '1',
    title: 'Value 1'
  },
  {
    key: '2',
    title: 'Value 2'
  },
  {
    key: '3',
    title: 'Value 3'
  }
]

const Template: Story<PropsWithChildren<Partial<TransferProps<any>>>> = () => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <FullWidthTransfer
      onChange={setSelected}
      targetKeys={selected}
      dataSource={data}
      titles={['Available', 'Selected']}
    />
  )
}

export const Base = Template.bind({})
