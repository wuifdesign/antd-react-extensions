import { ReactElement, ValidationMap, WeakValidationMap } from 'react'

export type FCWithoutChildren<P = {}> = {
  (props: P, context?: any): ReactElement<any, any> | null
  propTypes?: WeakValidationMap<P> | undefined
  contextTypes?: ValidationMap<any> | undefined
  defaultProps?: Partial<P> | undefined
  displayName?: string | undefined
}
