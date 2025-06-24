// --- Mapa para Cache ---

import { DASHBOARD_MENU_CONFIG } from '@/data/menu'
import { MenuItem } from '@/types/menu'

// O mapa agora armazenará o objeto MenuItem completo, usando o path como chave.
let pathMenuItemMap: Map<string, MenuItem> | null = null

/**
 * Constrói e armazena em cache um mapa de caminhos de URL para seus respectivos objetos MenuItem.
 * Este padrão Singleton garante que o mapa seja construído apenas uma vez.
 * @returns {Map<string, MenuItem>} O mapa de caminhos para itens de menu.
 */
const getPathMenuItemMap = (): Map<string, MenuItem> => {
  // Se o mapa já foi criado, retorna a versão em cache para máxima performance.
  if (pathMenuItemMap) {
    return pathMenuItemMap
  }

  // Se não, cria o mapa pela primeira vez.
  const map = new Map<string, MenuItem>()

  // Itera sobre cada grupo de menu
  for (const group of DASHBOARD_MENU_CONFIG) {
    // Itera sobre cada item dentro do grupo
    for (const item of group.items) {
      // A chave é o caminho (path), e o valor é o objeto item inteiro.
      map.set(item.path, item)
    }
  }

  // Armazena o mapa recém-criado no cache para chamadas futuras.
  pathMenuItemMap = map
  return pathMenuItemMap
}

/**
 * Encontra o objeto MenuItem completo correspondente a um determinado caminho (path) da URL.
 * A função é otimizada e usa um mapa em cache para buscas instantâneas.
 *
 * @param path O caminho da URL (ex: '/painel/dashboard_overview').
 * @returns O objeto MenuItem correspondente ou null se o caminho não for encontrado.
 *
 * @example
 * const menuItem = getMenuItemFromPath('/painel/users_list');
 * if (menuItem) {
 * console.log(menuItem.id);    // 'users_list'
 * console.log(menuItem.label); // 'Usuários'
 * }
 */
export const getMenuItemFromPath = (path: string): MenuItem | null => {
  const map = getPathMenuItemMap()
  return map.get(path) || null
}
