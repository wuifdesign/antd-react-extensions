import { createBrowserHistory, createHashHistory, createMemoryHistory, History } from 'history'

export type RouterHistoryTypesType = 'browser' | 'hash' | 'memory'

class RouterHistory {
  private static history: History

  static setHistoryByType(type?: RouterHistoryTypesType) {
    if (RouterHistory.history) {
      return
    }
    if (type === 'browser') {
      RouterHistory.history = createBrowserHistory()
    } else if (type === 'memory') {
      RouterHistory.history = createMemoryHistory()
    } else {
      RouterHistory.history = createHashHistory()
    }
  }

  static getHistory() {
    return RouterHistory.history
  }
}

export default RouterHistory
