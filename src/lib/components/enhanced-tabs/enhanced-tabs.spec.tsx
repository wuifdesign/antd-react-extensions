import React from 'react'
import { render, screen } from '@testing-library/react'
import { EnhancedTabs } from './enhanced-tabs'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const TabContent: React.FC<{ path: string; urlParamName?: string }> = ({ urlParamName }) => {
  return (
    <EnhancedTabs urlParamName={urlParamName}>
      <EnhancedTabs.TabPane icon={<UserOutlined />} tab="Tab 1" key="1">
        Content of Tab 1
      </EnhancedTabs.TabPane>
      <EnhancedTabs.TabPane icon={<LockOutlined />} tab="Tab 2" key="2">
        Content of Tab 2
      </EnhancedTabs.TabPane>
    </EnhancedTabs>
  )
}

describe('UrlAwareTabs', () => {
  test('should display first tab', async () => {
    render(<TabContent path="/" />)
    expect(screen.queryByText('Content of Tab 1')).toBeInTheDocument()
  })

  test('should render icon', async () => {
    const { baseElement } = render(<TabContent path="/" />)
    expect(baseElement.querySelector('.anticon.anticon-user')).toBeInTheDocument()
  })
})
