import React from 'react'

export type MenuItem = {
  title: string
  url: string
  exact?: boolean
  icon?: React.ReactNode
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
}

export type MenuElement = MenuItem | MenuGroup | MenuSubMenu

export type EnhancedMenuItem = MenuItem & { key: string }
export type EnhancedMenuGroup = MenuGroup & { key: string; activeBy: string[]; elements: EnhancedMenuElement[] }
export type EnhancedMenuSubMenu = MenuSubMenu & { key: string; activeBy: string[]; elements: EnhancedMenuElement[] }

export type EnhancedMenuElement = EnhancedMenuItem | EnhancedMenuGroup | EnhancedMenuSubMenu

export const isMenuItemType = (item: EnhancedMenuElement): item is EnhancedMenuItem => !(item as EnhancedMenuGroup).type
