import React from 'react'

export type IfProps = {
  condition: boolean
}

const If: React.FC<IfProps> = ({ condition, children }) => {
  if (condition) {
    return <>{children}</>
  }
  return null
}

export { If }
