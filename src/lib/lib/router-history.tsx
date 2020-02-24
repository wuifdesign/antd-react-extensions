import { createBrowserHistory, createHashHistory, History } from 'history'

class RouterHistory {
  private static history: History

  static setHistoryByType(type: 'browser' | 'hash') {
    if (RouterHistory.history) {
      return
    }
    if (type === 'browser') {
      RouterHistory.history = createBrowserHistory()
    } else {
      RouterHistory.history = createHashHistory()
    }
  }

  static getHistory() {
    return RouterHistory.history
  }
}

export default RouterHistory
