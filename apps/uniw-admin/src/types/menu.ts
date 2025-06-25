import { IAdminProfile } from '@uniw/shared-types'

export type ViewId =
  // Privados
  | 'meu-perfil'
  | 'sair'

  // Principal
  | 'visao-geral'
  | 'controle-de-acessos'

  // Plataforma
  | 'configuracoes'
  | 'termos-e-politicas'
  | 'registros'

  // Gestão de Fornecedores (B2B)
  | 'moderacao-fornecedores'
  | 'fornecedores'
  | 'catalogo-b2b'
  | 'pedidos-b2b'
  | 'suporte-fornecedores'

  // Gestão de Lojistas/Salões (Parceiros)
  | 'moderacao-parceiros'
  | 'parceiros'
  | 'categorias-b2c'
  | 'catalogo-b2c'
  | 'pedidos-b2c'
  | 'agendamentos'
  | 'equipes-e-colaboradores'
  | 'suporte-parceiros'

  // Gestão de Clientes (App)
  | 'clientes'
  | 'banners-home'
  | 'fidelidade'
  | 'clube-uniw'
  | 'suporte-clientes'

  // Conteúdo & Marketing
  | 'notificacoes'
  | 'promocoes'
  | 'sorteios'

  // Financeiro & Relatórios
  | 'financeiro'
  | 'assinaturas'
  | 'relatorio-de-vendas'
  | 'relatorio-de-usuarios'

export interface MenuItem {
  id: ViewId
  label: string
  title: string
  subtitle: string
  path: string
  icon: React.ReactNode
  active: boolean
  requiredPermission: keyof IAdminProfile['permissoes'] | null
  keywords: string[]
}

export interface MenuGroup {
  title: string
  items: MenuItem[]
  isVisible: boolean
}
