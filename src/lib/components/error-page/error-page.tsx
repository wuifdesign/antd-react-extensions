import React from 'react'
import { Result } from 'antd'

type ErrorKeysType = 403 | 404 | 500

type ErrorPageTranslationType = {
  [key in ErrorKeysType]: {
    title?: string
    description?: string
  }
}

export type ErrorPageProps = {
  type: ErrorKeysType
  description?: string
  translations?: ErrorPageTranslationType
}

const baseTranslations: ErrorPageTranslationType = {
  403: {
    title: '403',
    description: 'Sorry, you are not authorized to access this page.'
  },
  404: {
    title: '404',
    description: 'Sorry, the page you visited does not exist.'
  },
  500: {
    title: '500',
    description: 'Sorry, something went wrong please try again.'
  }
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type, description, translations = {} }) => {
  const _title = translations[type]?.title || baseTranslations[type].title
  const _description = description || translations[type]?.description || baseTranslations[type].description
  return <Result status={type} title={_title} subTitle={_description} />
}

export default ErrorPage
