import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { AdvancedTable, AdvancedTableProps } from './advanced-table'
import { Form, Input, Space, Tag } from 'antd'
import { AdvancedTableColumnType } from './advanced-table-column.type'
import { useAdvancedTable } from './utils/use-advanced-table'
import { Button } from '../button'

export default {
  component: AdvancedTable,
  title: 'Components/Advanced Table'
} as Meta

const Template: Story<PropsWithChildren<AdvancedTableProps & { cacheKey?: string }>> = ({
  initialFilterValues,
  cacheKey,
  ...args
}) => {
  const columns: AdvancedTableColumnType<any>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      visible: false
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      visibleMobile: false
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      renderExport: (tags: string[]) => tags.join(', '),
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      editable: false,
      exportable: false,
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
  const { tableProps } = useAdvancedTable(args.localStorageKey, {
    initialFilterValues,
    cacheKey
  })

  return <AdvancedTable {...tableProps({ dataSource: data, pagination: { total: 100 }, ...args, columns })} />
}

const WrappedTemplate: Story<PropsWithChildren<AdvancedTableProps>> = ({ ...args }) => {
  const [visible, setVisible] = useState(true)
  return (
    <>
      <Button style={{ marginBottom: 16 }} onClick={() => setVisible(!visible)}>
        Toggle Visibility
      </Button>
      {visible && <Template cacheKey="testCache" {...args} />}
    </>
  )
}

export const Base = Template.bind({})
Base.args = {
  title: 'Test Table',
  extra: 'Extra Content',
  renderHiddenColumnsAsExpandable: true,
  size: 'middle',
  outlined: true,
  loading: false,
  onChange: console.log,
  hideCsvExport: false,
  hideRowSizeChanger: false,
  hideSettings: false,
  onRefresh: () => console.log('refresh')
}

export const LocalStorage = Template.bind({})
LocalStorage.args = {
  ...Base.args,
  localStorageKey: 'test-table'
}

export const WithFilters = Template.bind({})
WithFilters.args = {
  ...Base.args,
  initialFilterValues: { name: 'test' },
  filters: (
    <>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
    </>
  )
}

export const WithFiltersVisible = Template.bind({})
WithFiltersVisible.args = {
  ...WithFilters.args,
  filterDefaultVisible: true
}

export const WithFiltersCache = WrappedTemplate.bind({})
WithFiltersCache.args = {
  ...WithFilters.args
}

export const WithFiltersVisibleAndCache = WrappedTemplate.bind({})
WithFiltersVisibleAndCache.args = {
  ...WithFiltersVisible.args
}

export const NoRenderHidden = Template.bind({})
NoRenderHidden.args = {
  ...Base.args,
  renderHiddenColumnsAsExpandable: false
}

export const CustomExpand = Template.bind({})
CustomExpand.args = {
  ...Base.args,
  renderHiddenColumnsAsExpandable: false,
  expandable: {
    expandedRowRender: () => 'test'
  }
}

export const CustomExpandWithDefault = Template.bind({})
CustomExpandWithDefault.args = {
  ...Base.args,
  expandable: {
    expandedRowRender: () => 'test'
  }
}
