import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { MenuElement } from '../admin-layout'
import { EnhancedMenuElement } from '../admin-layout/menu-element.type'
import { FCWithoutChildren } from '../../utils'

const enhanceMenu = (menuPart: MenuElement[], prefix: string = ''): EnhancedMenuElement[] => {
  Object.keys(menuPart).forEach((index) => {
    const item = menuPart[parseInt(index, 10)] as EnhancedMenuElement
    item.key = prefix + index
    if ('type' in item && item.elements) {
      enhanceMenu(item.elements, `${item.key}_`)
    }
  })
  return menuPart as EnhancedMenuElement[]
}

const renderMenu = (item: EnhancedMenuElement) => {
  if ('type' in item) {
    if (!item.elements) {
      return null
    }
    if (item.type === 'group') {
      return (
        <Menu.ItemGroup key={item.key} title={item.title}>
          {item.elements.map(renderMenu)}
        </Menu.ItemGroup>
      )
    }
    return (
      <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
        {item.elements.map(renderMenu)}
      </Menu.SubMenu>
    )
  }
  return (
    <Menu.Item key={item.key} icon={item.icon}>
      <Link to={item.url}>{item.title}</Link>
    </Menu.Item>
  )
}

const getActiveMenuKeys = (pathname: string, enhancedMenu: EnhancedMenuElement[]): string[] => {
  let activeKeys: string[] = []
  for (const item of enhancedMenu) {
    let isActive = false
    if ('type' in item && item.elements) {
      const subActiveKeys = getActiveMenuKeys(pathname, item.elements)
      if (subActiveKeys.length > 0) {
        isActive = true
      }
      activeKeys = [...activeKeys, ...subActiveKeys]
    } else if (!('type' in item) && item.url) {
      if (matchPath({ path: item.url, end: !!item.end }, pathname)) {
        isActive = true
      }
    }
    if ('isActive' in item && !!item.isActive) {
      isActive = item.isActive(pathname)
    }
    if (isActive) {
      activeKeys.push(item.key)
    }
  }
  return activeKeys
}

export type DynamicMenuProps = MenuProps & {
  elements: MenuElement[]
}

export const DynamicMenu: FCWithoutChildren<DynamicMenuProps> = ({ elements, ...props }) => {
  const location = useLocation()
  const menuWithKeys = useMemo(() => enhanceMenu(elements), [elements])

  const [selectedKeys, setSelectedKeys] = useState(() => getActiveMenuKeys(location.pathname, menuWithKeys))
  const [openKeys, setOpenKeys] = useState(() => getActiveMenuKeys(location.pathname, menuWithKeys))

  useEffect(() => {
    const activeKeys = getActiveMenuKeys(location.pathname, menuWithKeys)
    setSelectedKeys(activeKeys)
    setOpenKeys((keys) => [...Array.from(new Set([...keys].concat(activeKeys)))])
  }, [location, menuWithKeys])

  const onOpenChange = useCallback((keys: React.Key[]) => {
    setOpenKeys(keys as string[])
  }, [])

  return (
    <Menu
      theme="light"
      mode="inline"
      openKeys={openKeys}
      {...props}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
    >
      {menuWithKeys.map(renderMenu)}
    </Menu>
  )
}
