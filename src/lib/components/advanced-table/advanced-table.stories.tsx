import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { AdvancedTable, AdvancedTableProps } from './advanced-table'
import { Form, Input, Space, Tag } from 'antd'
import { AdvancedTableColumnType } from './types/advanced-table-column.type'
import { useAdvancedTable } from './utils/use-advanced-table'
import { EnhancedButton } from '../enhanced-button'

export default {
  component: AdvancedTable,
  title: 'Components/Advanced Table'
} as Meta

const columns: AdvancedTableColumnType<any>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a href="/">{text}</a>,
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
        <a href="/">Invite {record.name}</a>
        <a href="/">Delete</a>
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

const Template: Story<PropsWithChildren<AdvancedTableProps>> = ({ ...args }) => {
  return <AdvancedTable dataSource={data} pagination={{ total: 100 }} {...args} columns={columns} />
}

const TemplateWithHook: Story<PropsWithChildren<AdvancedTableProps>> = ({
  initialFilterValues,
  cacheKey,
  cacheState,
  preserveToLocalStorage,
  ...args
}) => {
  const { tableProps, currentPage, pageSize, filterValues } = useAdvancedTable({
    cacheKey,
    cacheState,
    preserveToLocalStorage,
    defaultState: {
      filterValues: initialFilterValues
    }
  })

  console.group('HookData')
  console.log('cacheKey', cacheKey)
  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)
  console.log('filterValues', filterValues)
  console.groupEnd()

  return <AdvancedTable {...tableProps({ dataSource: data, pagination: { total: 100 }, ...args, columns })} />
}

const WrappedTemplate: Story<PropsWithChildren<AdvancedTableProps>> = ({ ...args }) => {
  const [visible, setVisible] = useState(true)
  return (
    <>
      <EnhancedButton style={{ marginBottom: 16 }} onClick={() => setVisible(!visible)}>
        Toggle Visibility
      </EnhancedButton>
      {visible && <TemplateWithHook {...args} cacheState={true} />}
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

export const WithHook = TemplateWithHook.bind({})
WithHook.args = {
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

export const LocalStorage = TemplateWithHook.bind({})
LocalStorage.args = {
  ...Base.args,
  cacheKey: 'test-table',
  preserveToLocalStorage: true
}

export const WithFilters = TemplateWithHook.bind({})
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

export const WithFiltersVisible = TemplateWithHook.bind({})
WithFiltersVisible.args = {
  ...WithFilters.args,
  filterDefaultVisible: true
}

export const WithFiltersCache = WrappedTemplate.bind({})
WithFiltersCache.args = {
  ...WithFilters.args,
  cacheKey: 'test-table',
  cacheState: true
}

export const WithFiltersVisibleAndCache = WrappedTemplate.bind({})
WithFiltersVisibleAndCache.args = {
  ...WithFiltersCache.args,
  filterDefaultVisible: true
}

export const NoRenderHidden = TemplateWithHook.bind({})
NoRenderHidden.args = {
  ...Base.args,
  renderHiddenColumnsAsExpandable: false
}

export const CustomExpand = TemplateWithHook.bind({})
CustomExpand.args = {
  ...Base.args,
  renderHiddenColumnsAsExpandable: false,
  expandable: {
    expandedRowRender: () => 'test'
  }
}

export const CustomExpandWithDefault = TemplateWithHook.bind({})
CustomExpandWithDefault.args = {
  ...Base.args,
  expandable: {
    expandedRowRender: () => 'test'
  }
}
