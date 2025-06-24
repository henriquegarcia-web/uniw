'use client'

import React, { JSX } from 'react'
import { usePathname } from 'next/navigation'

import { getMenuItemFromPath } from '@/utils/navigation'
import NotFoundView from '@/views/common/NotFoundView/NotFoundView'
import type { ViewId, MenuItem } from '@/types/menu'

// const exhaustiveCheck = (_never: never): never => {
//   throw new Error(`Checagem de exaustividade da ViewId falhou: ${_never}`)
// }

const viewMap: { [key in ViewId]: React.LazyExoticComponent<() => JSX.Element> } = {
  // Privados
  'meu-perfil': React.lazy(
    () => import('@/views/common/AdminProfileView/AdminProfileView'),
  ),
  sair: React.lazy(
    () => import('@/views/platform/DashboardOverviewView/DashboardOverviewView'),
  ),

  // Plataforma & Acesso
  dashboard_overview: React.lazy(
    () => import('@/views/platform/DashboardOverviewView/DashboardOverviewView'),
  ),
  system_settings: React.lazy(
    () => import('@/views/platform/SystemSettingsView/SystemSettingsView'),
  ),
  access_control_roles: React.lazy(
    () => import('@/views/platform/AccessControlRolesView/AccessControlRolesView'),
  ),
  audit_logs: React.lazy(() => import('@/views/platform/AuditLogsView/AuditLogsView')),

  // Gestão de Fornecedores (B2B)
  suppliers_list: React.lazy(
    () => import('@/views/suppliers/SuppliersListView/SuppliersListView'),
  ),
  suppliers_products: React.lazy(
    () => import('@/views/suppliers/SuppliersProductsView/SuppliersProductsView'),
  ),
  suppliers_orders: React.lazy(
    () => import('@/views/suppliers/SuppliersOrdersView/SuppliersOrdersView'),
  ),

  // Gestão de Lojistas/Salões (Parceiros)
  partners_list: React.lazy(
    () => import('@/views/partners/PartnersListView/PartnersListView'),
  ),
  partners_services: React.lazy(
    () => import('@/views/partners/PartnersServicesView/PartnersServicesView'),
  ),
  partners_products_stock: React.lazy(
    () => import('@/views/partners/PartnersProductsStockView/PartnersProductsStockView'),
  ),
  partners_schedule: React.lazy(
    () => import('@/views/partners/PartnersScheduleView/PartnersScheduleView'),
  ),
  partners_staff: React.lazy(
    () => import('@/views/partners/PartnersStaffView/PartnersStaffView'),
  ),
  partners_clients: React.lazy(
    () => import('@/views/partners/PartnersClientsView/PartnersClientsView'),
  ),

  // Gestão de Clientes (App)
  clients_list: React.lazy(
    () => import('@/views/clients/ClientsListView/ClientsListView'),
  ),
  clients_loyalty_club: React.lazy(
    () => import('@/views/clients/ClientsLoyaltyClubView/ClientsLoyaltyClubView'),
  ),
  clients_support_tickets: React.lazy(
    () => import('@/views/clients/ClientsSupportTicketsView/ClientsSupportTicketsView'),
  ),

  // Conteúdo & Marketing
  content_banners: React.lazy(
    () => import('@/views/content/ContentBannersView/ContentBannersView'),
  ),
  content_notifications: React.lazy(
    () => import('@/views/content/ContentNotificationsView/ContentNotificationsView'),
  ),
  content_promotions: React.lazy(
    () => import('@/views/content/ContentPromotionsView/ContentPromotionsView'),
  ),
  content_raffles: React.lazy(
    () => import('@/views/content/ContentRafflesView/ContentRafflesView'),
  ),

  // Financeiro & Relatórios
  financial_transactions: React.lazy(
    () => import('@/views/financial/FinancialTransactionsView/FinancialTransactionsView'),
  ),
  financial_subscriptions: React.lazy(
    () =>
      import('@/views/financial/FinancialSubscriptionsView/FinancialSubscriptionsView'),
  ),
  reports_sales: React.lazy(
    () => import('@/views/financial/ReportsSalesView/ReportsSalesView'),
  ),
  reports_users: React.lazy(
    () => import('@/views/financial/ReportsUsersView/ReportsUsersView'),
  ),
}

export const RenderedView = () => {
  const pathname = usePathname()
  const viewActive: MenuItem | null = getMenuItemFromPath(pathname) || null

  if (!viewActive) return <NotFoundView />

  const ViewComponent = viewMap[viewActive.id]

  // if (!ViewComponent) {
  //   return exhaustiveCheck(viewActive)
  // }

  return (
    <ViewComponent />
    // <React.Suspense fallback={<div>Carregando tela...</div>}>
    // </React.Suspense>
  )
}
