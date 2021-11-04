import React, { useEffect } from 'react'

export const GuardWrapper: React.FC<{ onRender: () => void }> = ({ onRender, children }) => {
  useEffect(() => {
    onRender()
  }, [onRender])
  return <>{children}</>
}
