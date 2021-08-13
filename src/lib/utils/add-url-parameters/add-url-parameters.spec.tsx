import { addUrlParameters } from './add-url-parameters'

const baseUrl = 'http://localhost:3000/demo'

describe('addUrlParameters', () => {
  test('should not change base url', async () => {
    const url = addUrlParameters(baseUrl, {})
    expect(url).toBe(baseUrl)
  })
  test('should add to base url as number', async () => {
    const url = addUrlParameters(baseUrl, { test: 123 })
    expect(url).toBe(baseUrl + '?test=123')
  })
  test('should not add if undefined', async () => {
    const url = addUrlParameters(baseUrl, { test: undefined })
    expect(url).toBe(baseUrl)
  })
  test('should not add if undefined but add with value', async () => {
    const url = addUrlParameters(baseUrl, { test: undefined, test2: 123 })
    expect(url).toBe(baseUrl + '?test2=123')
  })
  test('should add to base url as string', async () => {
    const url = addUrlParameters(baseUrl, { test: 'testString' })
    expect(url).toBe(baseUrl + '?test=testString')
  })
  test('should add multiple params to base url as string', async () => {
    const url = addUrlParameters(baseUrl, { test: 'testString', test2: 123 })
    expect(url).toBe(baseUrl + '?test=testString&test2=123')
  })
  test('should add to url with existing search query', async () => {
    const url = addUrlParameters(baseUrl + '?base=1', { test: 'testString', test2: 123 })
    expect(url).toBe(baseUrl + '?base=1&test=testString&test2=123')
  })
})
