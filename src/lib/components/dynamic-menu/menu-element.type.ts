import React from 'react'

export type MenuItem = {
  title: string
  url: string
  icon?: React.ReactNode
  prefetch?: boolean
  isActive?: string[] | ((currentPath: string) => boolean)
}

export type MenuGroup = {
  title: string
  type: 'group'
  elements: MenuElement[]
}

export type MenuSubMenu = {
  title: string
  type: 'submenu'
  elements: MenuElement[]
  icon?: React.ReactNode
  isActive?: string[] | ((currentPath: string) => boolean)
}

export type MenuElement = MenuItem | MenuGroup | MenuSubMenu

export type EnhancedMenuItem = MenuItem & { key: string }
export type EnhancedMenuGroup = MenuGroup & { key: string; elements: EnhancedMenuElement[] }
export type EnhancedMenuSubMenu = MenuSubMenu & { key: string; elements: EnhancedMenuElement[] }

export type EnhancedMenuElement = EnhancedMenuItem | EnhancedMenuGroup | EnhancedMenuSubMenu
