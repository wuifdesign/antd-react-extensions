import React from 'react'
import { useTranslations } from '../../config-provider'
import { Spin } from 'antd'

export const LayoutFullPageLoading: React.FC = () => {
  const translations = useTranslations()
  return (
    <div className="page-loading">
      <Spin size="large" tip={translations.LayoutFullPageLoading.tip} />
    </div>
  )
}
