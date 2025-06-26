'use client'

import React, { JSX } from 'react'

import NotFoundView from '@/views/common/NotFoundView'
import type { ViewId } from '@/types/menu'
import { useAdminMenu } from '@/contexts/AdminMenuContext'

// const exhaustiveCheck = (_never: never): never => {
//   throw new Error(`Checagem de exaustividade da ViewId falhou: ${_never}`)
// }

const viewMap: { [key in ViewId]: React.LazyExoticComponent<() => JSX.Element> } = {
  // Privados
  'meu-perfil': React.lazy(() => import('@/views/common/AdminProfileView')),
  sair: React.lazy(() => import('@/views/platform/DashboardOverviewView')),

  // Principal
  'visao-geral': React.lazy(() => import('@/views/platform/DashboardOverviewView')),
  'controle-de-acessos': React.lazy(
    () => import('@/views/platform/AccessControlRolesView'),
  ),

  // Plataforma
  configuracoes: React.lazy(() => import('@/views/platform/SystemSettingsView')),
  'termos-e-politicas': React.lazy(() => import('@/views/platform/TermsAndPoliciesView')),
  registros: React.lazy(() => import('@/views/platform/AuditLogsView')),

  // Gestão de Fornecedores (B2B)
  'moderacao-fornecedores': React.lazy(
    () => import('@/views/suppliers/SuppliersModerationView'),
  ),
  fornecedores: React.lazy(() => import('@/views/suppliers/SuppliersListView')),
  'catalogo-b2b': React.lazy(() => import('@/views/suppliers/SuppliersProductsView')),
  'pedidos-b2b': React.lazy(() => import('@/views/suppliers/SuppliersOrdersView')),
  'suporte-fornecedores': React.lazy(
    () => import('@/views/suppliers/SuppliersSupportView'),
  ),

  // Gestão de Lojistas/Salões (Parceiros)
  'moderacao-parceiros': React.lazy(
    () => import('@/views/partners/PartnersModerationView'),
  ),
  parceiros: React.lazy(() => import('@/views/partners/PartnersListView')),
  'categorias-b2c': React.lazy(() => import('@/views/partners/PartnersCategoriesView')),
  'catalogo-b2c': React.lazy(() => import('@/views/partners/PartnersProductsView')),
  'pedidos-b2c': React.lazy(() => import('@/views/partners/PartnersOrdersView')),
  agendamentos: React.lazy(() => import('@/views/partners/PartnersScheduleView')),
  'equipes-e-colaboradores': React.lazy(
    () => import('@/views/partners/PartnersStaffView'),
  ),
  'suporte-parceiros': React.lazy(() => import('@/views/partners/PartnersSupportView')),

  // Gestão de Clientes (App)
  clientes: React.lazy(() => import('@/views/clients/ClientsListView')),
  fidelidade: React.lazy(() => import('@/views/clients/ClientsLoyaltyView')),
  'clube-uniw': React.lazy(() => import('@/views/clients/ClientsClubView')),
  'suporte-clientes': React.lazy(() => import('@/views/clients/ClientsSupportView')),
  'banners-home': React.lazy(() => import('@/views/clients/ClientsBannersView')),

  // Conteúdo & Marketing
  notificacoes: React.lazy(() => import('@/views/content/ContentNotificationsView')),
  promocoes: React.lazy(() => import('@/views/content/ContentPromotionsView')),
  sorteios: React.lazy(() => import('@/views/content/ContentRafflesView')),

  // Financeiro & Relatórios
  financeiro: React.lazy(() => import('@/views/financial/FinancialTransactionsView')),
  assinaturas: React.lazy(() => import('@/views/financial/FinancialSubscriptionsView')),
  'relatorio-de-vendas': React.lazy(() => import('@/views/financial/ReportsSalesView')),
  'relatorio-de-usuarios': React.lazy(() => import('@/views/financial/ReportsUsersView')),
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
