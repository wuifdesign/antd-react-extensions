import { createBrowserHistory, createHashHistory } from 'history';

class RouterHistory {
  static setHistoryByType(type) {
    if (RouterHistory.history) {
      return;
    }

    if (type === 'browser') {
      RouterHistory.history = createBrowserHistory();
    } else {
      RouterHistory.history = createHashHistory();
    }
  }

  static getHistory() {
    return RouterHistory.history;
  }

}

export default RouterHistory;