import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { UrlAwareTabs } from './url-aware-tabs'
import { Tabs } from 'antd'
import { MemoryRouter, Route } from 'react-router-dom'
import * as H from 'history'

const TabContent: React.FC<{ path: string; paramName?: string }> = ({ path, paramName }) => {
  return (
    <MemoryRouter initialEntries={[path]}>
      <UrlAwareTabs paramName={paramName}>
        <Tabs.TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </Tabs.TabPane>
      </UrlAwareTabs>
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
    let testLocation: H.Location<any>
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/']}>
        <UrlAwareTabs>
          <Tabs.TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </Tabs.TabPane>
        </UrlAwareTabs>
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location
            return null
          }}
        />
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
    render(<TabContent path="/?test=2" paramName="test" />)
    expect(screen.queryByText('Content of Tab 2')).toBeInTheDocument()
  })
})
