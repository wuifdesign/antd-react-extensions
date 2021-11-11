import React from 'react'

export type IfProps = {
  condition: boolean
  comment?: string
}

const If: React.FC<IfProps> = ({ condition, children }) => {
  if (condition) {
    return <>{children}</>
  }
  return null
}

export { If }
