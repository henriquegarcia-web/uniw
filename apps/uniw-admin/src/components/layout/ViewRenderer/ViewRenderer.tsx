'use client'

import React, { JSX } from 'react'

import NotFoundView from '@/views/common/NotFoundView/NotFoundView'
import type { ViewId } from '@/types/menu'
import { useAdminMenu } from '@/contexts/AdminMenuContext'

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

  // Principal
  'visao-geral': React.lazy(
    () => import('@/views/platform/DashboardOverviewView/DashboardOverviewView'),
  ),
  'controle-de-acessos': React.lazy(
    () => import('@/views/platform/AccessControlRolesView/AccessControlRolesView'),
  ),

  // Plataforma
  configuracoes: React.lazy(
    () => import('@/views/platform/SystemSettingsView/SystemSettingsView'),
  ),
  'termos-e-politicas': React.lazy(
    () => import('@/views/platform/TermsAndPoliciesView/TermsAndPoliciesView'),
  ),
  registros: React.lazy(() => import('@/views/platform/AuditLogsView/AuditLogsView')),

  // Gestão de Fornecedores (B2B)
  'moderacao-fornecedores': React.lazy(
    () => import('@/views/suppliers/SuppliersModerationView/SuppliersModerationView'),
  ),
  fornecedores: React.lazy(
    () => import('@/views/suppliers/SuppliersListView/SuppliersListView'),
  ),
  'catalogo-b2b': React.lazy(
    () => import('@/views/suppliers/SuppliersProductsView/SuppliersProductsView'),
  ),
  'pedidos-b2b': React.lazy(
    () => import('@/views/suppliers/SuppliersOrdersView/SuppliersOrdersView'),
  ),
  'suporte-fornecedores': React.lazy(
    () => import('@/views/suppliers/SuppliersSupportView/SuppliersSupportView'),
  ),

  // Gestão de Lojistas/Salões (Parceiros)
  'moderacao-parceiros': React.lazy(
    () => import('@/views/partners/PartnersModerationView/PartnersModerationView'),
  ),
  parceiros: React.lazy(
    () => import('@/views/partners/PartnersListView/PartnersListView'),
  ),
  'categorias-b2c': React.lazy(
    () => import('@/views/partners/PartnersCategoriesView/PartnersCategoriesView'),
  ),
  'catalogo-b2c': React.lazy(
    () => import('@/views/partners/PartnersProductsView/PartnersProductsView'),
  ),
  'pedidos-b2c': React.lazy(
    () => import('@/views/partners/PartnersOrdersView/PartnersOrdersView'),
  ),
  agendamentos: React.lazy(
    () => import('@/views/partners/PartnersScheduleView/PartnersScheduleView'),
  ),
  'equipes-e-colaboradores': React.lazy(
    () => import('@/views/partners/PartnersStaffView/PartnersStaffView'),
  ),
  'suporte-parceiros': React.lazy(
    () => import('@/views/partners/PartnersSupportView/PartnersSupportView'),
  ),

  // Gestão de Clientes (App)
  clientes: React.lazy(() => import('@/views/clients/ClientsListView/ClientsListView')),
  fidelidade: React.lazy(
    () => import('@/views/clients/ClientsLoyaltyView/ClientsLoyaltyView'),
  ),
  'clube-uniw': React.lazy(
    () => import('@/views/clients/ClientsClubView/ClientsClubView'),
  ),
  'suporte-clientes': React.lazy(
    () => import('@/views/clients/ClientsSupportView/ClientsSupportView'),
  ),
  'banners-home': React.lazy(
    () => import('@/views/clients/ClientsBannersView/ClientsBannersView'),
  ),

  // Conteúdo & Marketing
  notificacoes: React.lazy(
    () => import('@/views/content/ContentNotificationsView/ContentNotificationsView'),
  ),
  promocoes: React.lazy(
    () => import('@/views/content/ContentPromotionsView/ContentPromotionsView'),
  ),
  sorteios: React.lazy(
    () => import('@/views/content/ContentRafflesView/ContentRafflesView'),
  ),

  // Financeiro & Relatórios
  financeiro: React.lazy(
    () => import('@/views/financial/FinancialTransactionsView/FinancialTransactionsView'),
  ),
  assinaturas: React.lazy(
    () =>
      import('@/views/financial/FinancialSubscriptionsView/FinancialSubscriptionsView'),
  ),
  'relatorio-de-vendas': React.lazy(
    () => import('@/views/financial/ReportsSalesView/ReportsSalesView'),
  ),
  'relatorio-de-usuarios': React.lazy(
    () => import('@/views/financial/ReportsUsersView/ReportsUsersView'),
  ),
}

const RenderedView = () => {
  const { viewActive } = useAdminMenu()

  if (!viewActive || !viewMap[viewActive.id]) {
    return <NotFoundView />
  }

  const ViewComponent = viewMap[viewActive.id]

  return <ViewComponent />
}

export default RenderedView
