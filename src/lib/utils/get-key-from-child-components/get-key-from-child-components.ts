import React from 'react'
import toArray from 'rc-util/lib/Children/toArray'

export function getKeyFromChildComponents(children: React.ReactNode): string[] {
  return toArray(children)
    .map((child) => child.key as string)
    .filter((key) => key)
}
