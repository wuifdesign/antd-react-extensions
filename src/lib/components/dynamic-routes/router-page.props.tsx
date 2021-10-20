import { RouteElementType } from './route-element.type'
import * as H from 'history'
import { History } from 'history'
import { match } from 'react-router'

export type RouterPageProps<
  MatchParams extends { [K in keyof MatchParams]?: string } = any,
  LocationState = History.LocationState,
  StaticContext = any
> = {
  history: History<LocationState>
  location: H.Location<LocationState>
  match: match<MatchParams>
  staticContext: StaticContext
  routes?: RouteElementType[]
}
