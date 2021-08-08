import React from 'react'
import { Result } from 'antd'
import useTranslations from '../config-provider/use-translations'

type ErrorKeysType = 403 | 404 | 500

export type ErrorPageProps = {
  type: ErrorKeysType
  title?: string
  description?: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type, title, description }) => {
  const translations = useTranslations()
  return (
    <Result
      status={type}
      title={title || translations.ErrorPage[type]?.title}
      subTitle={description || translations.ErrorPage[type]?.description}
    />
  )
}

export default ErrorPage
