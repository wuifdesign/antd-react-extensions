import { createBrowserHistory, createHashHistory, createMemoryHistory, History } from 'history'

export type RouterHistoryTypesType = 'browser' | 'hash' | 'memory'

let history: History

export const RouterHistory = {
  setHistoryByType(type?: RouterHistoryTypesType) {
    if (history) {
      return
    }
    if (type === 'browser') {
      history = createBrowserHistory()
    } else if (type === 'memory') {
      history = createMemoryHistory()
    } else {
      history = createHashHistory()
    }
  },
  getHistory() {
    return history
  }
}
