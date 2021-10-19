import { RouteElementType } from './route-element.type'
import { History } from 'history'
import { match } from 'react-router'
import * as H from 'history'

export type RouterPageType = {
  history: History
  location: H.Location
  match: match
  staticContext: any
  routes?: RouteElementType[]
}
