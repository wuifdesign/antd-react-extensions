import React from 'react'
import { render, screen } from '@testing-library/react'
import { EnhancedLayout } from './enhanced-layout'
import { AdminLayout } from './layouts/admin-layout/admin-layout'
import { AuthLayout } from './layouts/auth-layout/auth-layout'

describe('AdminLayout', () => {
  it('should render', () => {
    render(<EnhancedLayout>Content</EnhancedLayout>)
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
  })

  it('should render admin layout', () => {
    render(
      <EnhancedLayout>
        <AdminLayout menu={[]} logo={() => 'LOGO'}>
          Content
        </AdminLayout>
      </EnhancedLayout>
    )
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
  })

  it('should render auth layout', () => {
    render(
      <EnhancedLayout>
        <AuthLayout logo={'LOGO'}>Content</AuthLayout>
      </EnhancedLayout>
    )
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
  })
})
