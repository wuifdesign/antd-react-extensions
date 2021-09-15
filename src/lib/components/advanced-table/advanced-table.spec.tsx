import React from 'react'
import { render } from '@testing-library/react'
import { AdvancedTable } from './advanced-table'
import { AdvancedTableColumnType } from './advanced-table-column.type'
import { Space, Tag } from 'antd'
import { useAdvancedTable } from './utils/use-advanced-table'

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
    key: 'address'
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

const AdvancedTableWithHook: React.FC = () => {
  const { tableProps } = useAdvancedTable()
  return <AdvancedTable {...tableProps({ columns, dataSource: data })} />
}

describe('AdvancedTable', () => {
  it('should render', () => {
    render(<AdvancedTable dataSource={data} columns={columns} />)
  })

  it('should display children', () => {
    const { baseElement } = render(<AdvancedTable dataSource={data} columns={columns} />)
    expect(baseElement.querySelectorAll('[data-row-key="1"] .ant-table-cell')[2].innerHTML).toBe(
      'New York No. 1 Lake Park'
    )
  })

  it('should have buttons', () => {
    const { baseElement } = render(<AdvancedTable dataSource={data} columns={columns} onRefresh={() => null} />)
    expect(baseElement.querySelector('.anticon.anticon-reload')).toBeInTheDocument()
    expect(baseElement.querySelector('.anticon.anticon-file-excel')).toBeInTheDocument()
    expect(baseElement.querySelector('.anticon.anticon-column-height')).toBeInTheDocument()
    expect(baseElement.querySelector('.anticon.anticon-setting')).toBeInTheDocument()
  })

  it('should render with hook', () => {
    const { baseElement } = render(<AdvancedTableWithHook />)
    expect(baseElement.querySelectorAll('[data-row-key="1"] .ant-table-cell')[2].innerHTML).toBe(
      'New York No. 1 Lake Park'
    )
  })
})
