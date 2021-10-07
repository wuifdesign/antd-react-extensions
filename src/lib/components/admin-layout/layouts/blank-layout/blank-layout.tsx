import React from 'react'
import { useBodyClass } from '../../../../utils/hooks/use-body-class'

export const BlankLayout: React.FC = ({ children }) => {
  useBodyClass('blank-layout')

  return <>{children}</>
}
