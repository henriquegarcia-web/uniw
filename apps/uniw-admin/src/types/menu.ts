export type ViewId =
  // Privados
  | 'meu-perfil'
  | 'sair'

  // Plataforma & Acesso
  | 'dashboard_overview'
  | 'system_settings'
  | 'access_control_roles'
  | 'audit_logs'

  // Gestão de Fornecedores (B2B)
  | 'suppliers_list'
  | 'suppliers_products'
  | 'suppliers_orders'

  // Gestão de Lojistas/Salões (Parceiros)
  | 'partners_list'
  | 'partners_services'
  | 'partners_products_stock'
  | 'partners_schedule'
  | 'partners_staff'
  | 'partners_clients'

  // Gestão de Clientes (App)
  | 'clients_list'
  | 'clients_loyalty_club'
  | 'clients_support_tickets'

  // Conteúdo & Marketing
  | 'content_banners'
  | 'content_notifications'
  | 'content_promotions'
  | 'content_raffles'

  // Financeiro & Relatórios
  | 'financial_transactions'
  | 'financial_subscriptions'
  | 'reports_sales'
  | 'reports_users'

export interface MenuItem {
  id: ViewId
  label: string
  path: string
  icon: React.ReactNode
  active: boolean
  keywords: string[]
}

export interface MenuGroup {
  title: string
  items: MenuItem[]
  isVisible: boolean
}
