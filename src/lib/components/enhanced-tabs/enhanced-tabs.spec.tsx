import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { EnhancedTabs } from './enhanced-tabs'
import { Tabs } from 'antd'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Location } from 'history'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const TabContent: React.FC<{ path: string; urlParamName?: string }> = ({ path, urlParamName }) => {
  return (
    <MemoryRouter initialEntries={[path]}>
      <EnhancedTabs urlParamName={urlParamName}>
        <EnhancedTabs.TabPane icon={<UserOutlined />} tab="Tab 1" key="1">
          Content of Tab 1
        </EnhancedTabs.TabPane>
        <EnhancedTabs.TabPane icon={<LockOutlined />} tab="Tab 2" key="2">
          Content of Tab 2
        </EnhancedTabs.TabPane>
      </EnhancedTabs>
    </MemoryRouter>
  )
}

describe('UrlAwareTabs', () => {
  test('should display first tab', async () => {
    render(<TabContent path="/" />)
    expect(screen.queryByText('Content of Tab 1')).toBeInTheDocument()
  })

  test('should display second tab', async () => {
    render(<TabContent path="/?tab=2" />)
    expect(screen.queryByText('Content of Tab 2')).toBeInTheDocument()
  })

  test('should change url on click', async () => {
    let testLocation: Location
    const Page: React.FC = () => {
      testLocation = useLocation()
      return null
    }

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/']}>
        <EnhancedTabs>
          <Tabs.TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </Tabs.TabPane>
        </EnhancedTabs>
        <Routes>
          <Route path="*" element={<Page />} />
        </Routes>
      </MemoryRouter>
    )
    const getQuery = () => {
      return testLocation?.search
    }
    expect(getQuery()).toBe('')
    const tab2 = baseElement.querySelector('#rc-tabs-test-tab-2')
    fireEvent.click(tab2 as Element)
    expect(getQuery()).toBe('?tab=2')
    expect(screen.queryByText('Content of Tab 2')).toBeInTheDocument()
  })

  test('should change param name', async () => {
    render(<TabContent path="/?test=2" urlParamName="test" />)
    expect(screen.queryByText('Content of Tab 2')).toBeInTheDocument()
  })

  test('should render icon', async () => {
    const { baseElement } = render(<TabContent path="/" />)
    expect(baseElement.querySelector('.anticon.anticon-user')).toBeInTheDocument()
  })
})
