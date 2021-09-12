import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { AdvancedTable, AdvancedTableProps } from './advanced-table'
import { Form, Input, Space, Tag } from 'antd'
import { AdvancedTableColumnType } from './advanced-table-column.type'

export default {
  component: AdvancedTable,
  title: 'Components/Advanced Table'
} as Meta

const Template: Story<PropsWithChildren<AdvancedTableProps>> = (args) => {
  const columns: AdvancedTableColumnType<any>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      visible: false
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      visibleMobile: false
    },
    {
      title: 'Tags',
      key: 'tags',
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

  return <AdvancedTable {...args} dataSource={data} columns={columns} />
}

export const Base = Template.bind({})
Base.args = {
  title: 'Test Table',
  extra: 'Extra Content',
  renderHiddenColumnsAsExpandable: true,
  size: 'middle',
  outlined: true,
  loading: false,
  onFilterSubmit: console.log,
  filterInitialValues: { name: 'test' },
  hideCsvExport: false,
  hideSizeChanger: false,
  hideSettings: false,
  onRefresh: console.log
}

export const LocalStorage = Template.bind({})
LocalStorage.args = {
  ...Base.args,
  localStorageKey: 'test-table'
}

export const WithFilters = Template.bind({})
WithFilters.args = {
  ...Base.args,
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
