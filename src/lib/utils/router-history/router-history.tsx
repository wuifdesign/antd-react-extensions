import React from 'react'
import { BrowserRouter, HashRouter, MemoryRouter, To } from 'react-router-dom'
import { NavigateFunction, NavigateOptions } from 'react-router'

export type RouterHistoryTypesType = 'browser' | 'hash' | 'memory'

let router: React.ElementType
let navigateFunction: NavigateFunction

export const RouterHistory = {
  setType(type?: RouterHistoryTypesType) {
    if (router) {
      return
    }
    if (type === 'browser') {
      router = BrowserRouter
    } else if (type === 'memory') {
      router = MemoryRouter
    } else {
      router = HashRouter
    }
  },
  setNavigateFunction(navigate: NavigateFunction) {
    navigateFunction = navigate
  },
  getRouter() {
    if (!router) {
      router = HashRouter
    }
    return router
  },
  navigate(to: To, options?: NavigateOptions) {
    return navigateFunction(to, options)
  }
}
