import React from 'react'
import { Layout } from 'antd'
import { useIsMobile } from '../../../utils/hooks/use-is-mobile'
import { useBodyClass } from '../../../utils/hooks/use-body-class'
import { PageContent } from '../../page-content'
import clsx from 'clsx'

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
        className={clsx('ant-layout-content', 'auth-container', { 'ant-layout-content-mobile': isMobile })}
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
