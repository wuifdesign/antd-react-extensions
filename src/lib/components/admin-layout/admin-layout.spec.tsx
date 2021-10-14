import React from 'react'
import { render, screen } from '@testing-library/react'
import { AdminLayout } from './admin-layout'
import { RouteElementType } from './route-element.type'
import { RouterHistory } from '../../utils'

const routes: RouteElementType[] = [
  {
    path: '/',
    layout: 'default',
    breadcrumb: 'Dashboard',
    component: () => <div data-testid="name">Dashboard</div>,
    exact: true
  },
  {
    path: '/restricted',
    layout: 'default',
    breadcrumb: 'Restricted',
    component: () => <div data-testid="name">Restricted</div>,
    canActivate: () => false,
    exact: true
  },
  {
    path: '/restricted-with-fallback',
    layout: 'default',
    breadcrumb: 'Restricted',
    component: () => <div data-testid="name">Restricted</div>,
    canActivate: () => false,
    canActivateFallback: {
      renderLayout: false,
      component: 'My Custom Fallback without Layout'
    },
    exact: true
  },
  {
    path: '/restricted-with-undefined',
    layout: 'default',
    breadcrumb: 'Restricted',
    component: () => <div data-testid="name">Restricted</div>,
    canActivate: () => undefined,
    exact: true
  }
]

const defaultProps = {
  routes: routes,
  defaultLayoutProps: { menu: [], logo: () => 'Logo' }
}

describe('AdminLayout', () => {
  it('should render', () => {
    render(<AdminLayout {...defaultProps} />)
  })

  it('should render dashboard route', () => {
    render(<AdminLayout {...defaultProps} />)
    const title = screen.getByTestId('name')
    expect(title).toBeInTheDocument()
    expect(title.innerHTML).toBe('Dashboard')
  })

  it('should render dashboard route', () => {
    render(<AdminLayout {...defaultProps} />)
    const title = screen.getByTestId('name')
    expect(title).toBeInTheDocument()
    expect(title.innerHTML).toBe('Dashboard')
  })

  it('should render fallback for restricted route', () => {
    RouterHistory.setHistoryByType('memory')
    RouterHistory.getHistory().push('/restricted')
    render(<AdminLayout {...defaultProps} />)
    expect(screen.getByText('403')).toBeInTheDocument()
  })

  it('should render fallback for restricted route with fallback', () => {
    RouterHistory.setHistoryByType('memory')
    RouterHistory.getHistory().push('/restricted-with-fallback')
    render(<AdminLayout {...defaultProps} />)
    expect(screen.getByText('My Custom Fallback without Layout')).toBeInTheDocument()
    expect(screen.queryByText('Restricted')).not.toBeInTheDocument()
  })

  it('should render spinner on undefined canActivate', () => {
    RouterHistory.setHistoryByType('memory')
    RouterHistory.getHistory().push('/restricted-with-undefined')
    const { baseElement } = render(<AdminLayout {...defaultProps} />)
    expect(baseElement.querySelector('.ant-spin.ant-spin-spinning')).toBeInTheDocument()
  })
})
