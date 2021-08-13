import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'

export const useReactRouter = <Params extends { [K in keyof Params]?: string } = {}>() => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams<Params>()
  const routeMatch = useRouteMatch()
  const searchParams: Record<string, string> = {}

  const query = new URLSearchParams(location.search)
  query.forEach((value, key) => {
    searchParams[key] = value
  })

  return {
    history,
    location,
    routeMatch,
    params,
    searchParams
  }
}
