import React from 'react'

export function getPropFromChildComponents(children: React.ReactNode, prop: string): string[] {
  return (
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return (child as any)[prop]
      }
      return undefined
    })?.filter((tab: string) => tab) || []
  )
}
