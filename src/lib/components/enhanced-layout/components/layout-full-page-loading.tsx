import React from 'react'
import { useTranslations } from '../../config-provider'
import { Spin } from 'antd'
import { FCWithoutChildren } from '../../..'

export const LayoutFullPageLoading: FCWithoutChildren = () => {
  const translations = useTranslations()
  return (
    <div className="page-loading">
      <Spin size="large" tip={translations.LayoutFullPageLoading.tip} />
    </div>
  )
}
