import React, { ReactNode } from 'react'

export type FCRequiredChildren<T = {}, Children = ReactNode> = React.FC<
  T & {
    children: Children
  }
>
