import React from 'react'

export function getKeysFromChildComponents(children: React.ReactNode): string[] {
  return React.Children.map(children, (child) => (child as any)?.key)?.filter((tab: string) => tab) || []
}
