import React, { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react'

export type FCRequiredChildren<T = {}, Children = ReactNode> = React.FC<
  T & {
    children: Children
  }
>

export type FCWithoutChildren<P = {}> = {
  (props: P, context?: any): ReactElement<any, any> | null
  propTypes?: WeakValidationMap<P> | undefined
  contextTypes?: ValidationMap<any> | undefined
  defaultProps?: Partial<P> | undefined
  displayName?: string | undefined
}
