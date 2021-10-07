import React from 'react'
import { Layout } from 'antd'
import { useBodyClass } from '../../../../utils/hooks/use-body-class'
import { PageContent } from '../../../page-content'
import clsx from 'clsx'
import { useIsMobile } from '../../../config-provider'

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
        className={clsx('default-layout-content', 'auth-container', { 'default-layout-content-mobile': isMobile })}
        style={{
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
          <PageContent.Element>
            <div
              className="auth-logo-container"
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {logo}
            </div>
            {children}
          </PageContent.Element>
        </PageContent>
      </Layout>
    </>
  )
}
