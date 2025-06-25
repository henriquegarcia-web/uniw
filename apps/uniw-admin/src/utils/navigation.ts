import { DASHBOARD_MENU_CONFIG } from '@/data/menu'
import { MenuItem } from '@/types/menu'

let pathMenuItemMap: Map<string, MenuItem> | null = null

const getPathMenuItemMap = (): Map<string, MenuItem> => {
  if (pathMenuItemMap) {
    return pathMenuItemMap
  }
  const map = new Map<string, MenuItem>()
  for (const group of DASHBOARD_MENU_CONFIG) {
    for (const item of group.items) {
      map.set(item.path, item)
    }
  }
  pathMenuItemMap = map
  return pathMenuItemMap
}

export const getMenuItemFromPath = (path: string): MenuItem | null => {
  const map = getPathMenuItemMap()
  return map.get(path) || null
}
