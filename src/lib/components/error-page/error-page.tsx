import React from 'react'
import { Result } from 'antd'
import { useTranslations } from '../config-provider/use-translations'
import { FCWithoutChildren } from '../../utils'

type ErrorKeysType = 403 | 404 | 500

export type ErrorPageProps = {
  type: ErrorKeysType
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  extra?: React.ReactNode
}

export const ErrorPage: FCWithoutChildren<ErrorPageProps> = ({ type, icon, title, description, extra, ...props }) => {
  const translations = useTranslations()
  return (
    <Result
      {...props}
      icon={icon}
      status={type}
      title={title || translations.ErrorPage[type]?.title}
      subTitle={description || translations.ErrorPage[type]?.description}
      extra={extra}
    />
  )
}
