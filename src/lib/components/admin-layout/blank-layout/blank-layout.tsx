import React from 'react'
import useBodyClass from '../../../lib/hooks/use-body-class'

export const BlankLayout: React.FC = ({ children }) => {
  useBodyClass('blank-layout')

  return <>{children}</>
}

export default BlankLayout
