import React from 'react'
import { Layout } from 'antd'
import { useIsMobile } from '../../../utils/hooks/use-is-mobile'
import { useBodyClass } from '../../../utils/hooks/use-body-class'
import { PageContent } from '../../page-content'
import { PAGE_PADDING } from '../admin-layout-config'
import { PageElement } from '../../page-element'

export type AuthLayoutProps = {
  logo: React.ReactNode | string
  authPageMaxWidth?: number
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ logo, authPageMaxWidth = 400, children }) => {
  useBodyClass('auth-layout')

  const isMobile = useIsMobile()

  return (
    <>
      <Layout
        className="auth-container"
        style={{
          padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PageContent
          style={{
            width: '100%',
            maxWidth: authPageMaxWidth
          }}
          hideBreadcrumbs
        >
          <PageElement>
            <div
              className="auth-logo-container"
              style={{
                marginBottom: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {logo}
            </div>
            {children}
          </PageElement>
        </PageContent>
      </Layout>
    </>
  )
}
