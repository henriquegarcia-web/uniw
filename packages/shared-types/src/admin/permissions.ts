// ─── ADMIN PERMISSIONS TYPES ────────────────────────────────────────────────

export interface IAdminPermissions {
  // Principal
  dashboard_view: boolean // Acesso à Visão Geral (Dashboard)
  adminAccess_view: boolean // Ver a tela de Controle de Acessos
  adminAccess_manage: boolean // Criar, editar e remover outros administradores
  auditLogs_view: boolean // Acesso aos Logs de Auditoria

  // Plataforma
  platformSettings_view: boolean
  platformSettings_manage: boolean
  legalContent_view: boolean
  legalContent_manage: boolean // Gerenciar Termos e Políticas

  // Gestão de Fornecedores (B2B)
  suppliers_moderate: boolean // Moderar novos fornecedores
  suppliers_view: boolean
  suppliers_manage: boolean // Editar e desativar fornecedores
  b2bCatalog_view: boolean
  b2bCatalog_manage: boolean
  b2bOrders_view: boolean
  b2bOrders_manage: boolean // Alterar status de pedidos B2B

  // Gestão de Lojistas/Parceiros (B2C)
  partners_moderate: boolean // Moderar novos parceiros
  partners_view: boolean
  partners_manage: boolean // Editar e desativar parceiros
  partners_viewSchedules: boolean // Ver agendas
  partners_manageStaff: boolean // Gerenciar equipes e colaboradores
  b2cCatalog_view: boolean
  b2cCatalog_manage: boolean // Gerenciar categorias e produtos B2C
  b2cOrders_view: boolean
  b2cOrders_manage: boolean

  // Gestão de Clientes Finais (App)
  endUsers_view: boolean
  endUsers_manage: boolean // Editar, bloquear e remover clientes
  appContent_manageBanners: boolean // Gerenciar Banners da Home
  loyalty_manage: boolean // Gerenciar Fidelidade e Cupons
  club_manage: boolean // Gerenciar Clube UNIW

  // Suporte (agrupado por ser a mesma funcionalidade)
  supportTickets_view: boolean
  supportTickets_manage: boolean // Responder e fechar tickets

  // Conteúdo & Marketing
  marketing_sendNotifications: boolean
  marketing_managePromotions: boolean
  marketing_manageRaffles: boolean // Gerenciar sorteios

  // Financeiro & Relatórios
  finances_viewTransactions: boolean
  finances_manageSubscriptions: boolean
  reports_viewSales: boolean
  reports_viewUsers: boolean

  // Super Admin
  super_admin: boolean
}

export const permissionLabels: Record<keyof IAdminPermissions, string> = {
  dashboard_view: 'Ver Dashboard',
  adminAccess_view: 'Ver Controle de Acesso',
  adminAccess_manage: 'Gerenciar Admins',
  auditLogs_view: 'Ver Logs de Auditoria',
  platformSettings_view: 'Ver Configurações',
  platformSettings_manage: 'Gerenciar Configurações',
  legalContent_view: 'Ver Termos e Políticas',
  legalContent_manage: 'Gerenciar Termos e Políticas',
  suppliers_moderate: 'Moderar Fornecedores',
  suppliers_view: 'Ver Fornecedores',
  suppliers_manage: 'Gerenciar Fornecedores',
  b2bCatalog_view: 'Ver Catálogo B2B',
  b2bCatalog_manage: 'Gerenciar Catálogo B2B',
  b2bOrders_view: 'Ver Pedidos B2B',
  b2bOrders_manage: 'Gerenciar Pedidos B2B',
  partners_moderate: 'Moderar Parceiros',
  partners_view: 'Ver Parceiros',
  partners_manage: 'Gerenciar Parceiros',
  partners_viewSchedules: 'Ver Agendas',
  partners_manageStaff: 'Gerenciar Equipes',
  b2cCatalog_view: 'Ver Catálogo B2C',
  b2cCatalog_manage: 'Gerenciar Catálogo B2C',
  b2cOrders_view: 'Ver Pedidos B2C',
  b2cOrders_manage: 'Gerenciar Pedidos B2C',
  endUsers_view: 'Ver Clientes Finais',
  endUsers_manage: 'Gerenciar Clientes Finais',
  appContent_manageBanners: 'Gerenciar Banners',
  loyalty_manage: 'Gerenciar Fidelidade',
  club_manage: 'Gerenciar Clube UNIW',
  supportTickets_view: 'Ver Tickets de Suporte',
  supportTickets_manage: 'Gerenciar Tickets de Suporte',
  marketing_sendNotifications: 'Enviar Notificações',
  marketing_managePromotions: 'Gerenciar Promoções',
  marketing_manageRaffles: 'Gerenciar Sorteios',
  finances_viewTransactions: 'Ver Transações',
  finances_manageSubscriptions: 'Gerenciar Assinaturas',
  reports_viewSales: 'Ver Relatórios de Vendas',
  reports_viewUsers: 'Ver Relatórios de Usuários',
  super_admin: 'Super Admin',
}
