type ParamsType = Record<string, string | number | undefined>

const mapParams = (params: ParamsType) => {
  return Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`)
}

export const addUrlParameters = (url: string, params?: ParamsType) => {
  if (!params || url.indexOf('data:') === 0) {
    return url
  }
  const mappedParams = mapParams(params)
  if (mappedParams.length === 0) {
    return url
  }
  return url + (url.includes('?') ? '&' : '?') + mappedParams.join('&')
}
