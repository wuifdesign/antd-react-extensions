import React from 'react'
import { render, screen } from '@testing-library/react'
import NotificationsList from './notifications-list'
import { MailOutlined } from '@ant-design/icons'

const data = [
  {
    icon: <MailOutlined />,
    title: 'Title 1',
    description: 'This is description number 1',
    onClick: () => console.log('item 1')
  },
  {
    icon: <MailOutlined />,
    title: 'Title 2',
    description: 'This is description number 2',
    onClick: () => console.log('item 2')
  },
  {
    icon: <MailOutlined />,
    title: 'Title 3',
    description: 'This is description number 3',
    onClick: () => console.log('item 3')
  }
]

describe('NotificationsList', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  it('should render', () => {
    render(<NotificationsList dataSource={data} />)
  })

  it('should display children', () => {
    render(<NotificationsList dataSource={data} />)
    const buttonText = screen.getByText(/Title 1/i)
    expect(buttonText).toBeInTheDocument()
  })
})