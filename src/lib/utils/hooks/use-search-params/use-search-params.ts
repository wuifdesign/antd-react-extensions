import { useLocation } from 'react-router-dom'

export const useSearchParams = () => {
  const location = useLocation()
  const searchParams: Record<string, string> = {}

  const query = new URLSearchParams(location.search)
  query.forEach((value, key) => {
    searchParams[key] = value
  })

  return searchParams
}
