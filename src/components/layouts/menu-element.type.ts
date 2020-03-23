export type MenuItem = {
  name: string
  url: string
  exact?: boolean
  icon?: JSX.Element
}

export type MenuGroup = {
  name: string
  type: 'group'
  elements: MenuElement[]
  icon?: JSX.Element
}

export type MenuSubMenu = {
  name: string
  type: 'submenu'
  elements: MenuElement[]
  icon?: JSX.Element
}

export const checkIfMenuItemType = (item: MenuElement): item is MenuItem => !(item as MenuGroup).type;
export const checkIfMenuGroupType = (item: MenuElement): item is MenuGroup | MenuSubMenu => !!(item as MenuGroup).type;

export type MenuElement = MenuItem | MenuGroup | MenuSubMenu;

export type EnhancedMenuElement =
  MenuItem & { key: string } |
  MenuGroup & { key: string, activeBy: string[], elements: EnhancedMenuElement[] } |
  MenuSubMenu & { key: string, activeBy: string[], elements: EnhancedMenuElement[] };
