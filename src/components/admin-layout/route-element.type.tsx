import React from 'react';

export type RouteElement = {
  path: string
  breadcrumb: React.ReactNode | string
  component: React.ElementType
  routes?: RouteElement[]
  exact?: boolean
  is404?: boolean
}
