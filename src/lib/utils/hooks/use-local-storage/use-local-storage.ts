import { useEffect, useState } from 'react'

/**
 * Sync state to local storage so that it persists through a page refresh.
 * Usage is similar to useState except we pass in a local storage key so that we can default to that
 * value on page load instead of the specified initial value.
 *
 * @example
 * const MyComponent = () => {
 *   const [myStoredItem, setMyStoredItem] = useLocalStorage('myStoredItem', 'My Default Value')
 *   return (
 *     <div>{myStoredItem}</div>
 *   )
 * }
 */
export const useLocalStorage = <T = any>(
  key: string | undefined | null,
  initialValue: any = null,
  usedInSSR = false
): [T, (value: T) => any] => {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (!usedInSSR && key) {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {}
    return initialValue
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      if (key) {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (usedInSSR && key) {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    }
  }, [usedInSSR, key])

  return [storedValue, setValue]
}
