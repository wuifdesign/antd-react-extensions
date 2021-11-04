import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AdminLayout } from './admin-layout'
import { RouterHistory } from '../../utils'
import { EnhancedRouteType } from '../enhanced-routes'

const Guard: React.FC<{ allowed: boolean }> = ({ allowed, children }) => {
  if (!allowed) {
    return <>BLOCKED</>
  }
  return <>{children}</>
}

const routes: EnhancedRouteType[] = [
  {
    path: '/',
    layout: 'default',
    breadcrumb: 'Dashboard',
    element: <div data-testid="name">Dashboard</div>
  },
  {
    path: '/restricted',
    layout: 'default',
    breadcrumb: 'Restricted',
    element: <div data-testid="name">Restricted</div>,
    guard: <Guard allowed={false} />
  },
  {
    path: '/restricted-with-fallback',
    layout: 'default',
    breadcrumb: 'Restricted',
    element: <div data-testid="name">Restricted</div>,
    guard: <Guard allowed={false} />,
    guardWithLayout: false
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
    RouterHistory.setType('memory')
    RouterHistory.navigate('/restricted')
    render(<AdminLayout {...defaultProps} />)
    expect(screen.getByText('BLOCKED')).toBeInTheDocument()
  })

  it('should render fallback for restricted route with fallback', () => {
    RouterHistory.setType('memory')
    RouterHistory.navigate('/restricted-with-fallback')
    render(<AdminLayout {...defaultProps} />)
    waitFor(() => expect(screen.queryByText('Logo')).not.toBeInTheDocument())
  })
})
