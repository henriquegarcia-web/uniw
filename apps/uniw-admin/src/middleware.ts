import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DASHBOARD_MENU_CONFIG } from './data/menu'
import { UserRole } from '@uniw/shared-types'

// --- Constantes de Rota ---
const AUTH_SIGN_IN_PATH = '/auth/entrar'
const DASHBOARD_BASE_PATH = '/painel'
const DEFAULT_DASHBOARD_PATH = '/painel/visao-geral'

// --- Geração de Rotas Válidas (Otimizado) ---
// Criamos um Set com todos os paths válidos do painel uma única vez.
// Isso é muito mais performático do que percorrer o array de menus a cada requisição.
const validDashboardPaths = new Set<string>(
  DASHBOARD_MENU_CONFIG.flatMap((group) => group.items.map((item) => item.path)),
)
// Adicionamos a rota base do painel também como uma rota "válida" para o middleware
validDashboardPaths.add(DASHBOARD_BASE_PATH)

// ─── Middleware Principal ────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value

  // 1. Lógica para usuários AUTENTICADOS (possuem token)
  if (token && role === UserRole.ADMINISTRADOR) {
    // Redireciona de /auth/entrar para o painel
    if (pathname === AUTH_SIGN_IN_PATH) {
      url.pathname = DEFAULT_DASHBOARD_PATH
      return NextResponse.redirect(url)
    }

    // Redireciona da rota base /painel para a página de visão geral
    if (pathname === DASHBOARD_BASE_PATH) {
      url.pathname = DEFAULT_DASHBOARD_PATH
      return NextResponse.redirect(url)
    }

    // Se a rota está dentro do painel, mas não é uma rota válida, redireciona.
    if (pathname.startsWith(DASHBOARD_BASE_PATH) && !validDashboardPaths.has(pathname)) {
      console.warn(`[Middleware] Rota inválida acessada: ${pathname}. Redirecionando...`)
      url.pathname = DEFAULT_DASHBOARD_PATH
      return NextResponse.redirect(url)
    }
  }

  // 2. Lógica para usuários NÃO AUTENTICADOS (não possuem token)
  if (!token) {
    // Redireciona de qualquer rota do painel para a página de login
    if (pathname.startsWith(DASHBOARD_BASE_PATH)) {
      url.pathname = AUTH_SIGN_IN_PATH
      return NextResponse.redirect(url)
    }
  }

  // 3. Permite que a requisição continue se nenhuma regra for aplicada.
  return NextResponse.next()
}

// ─── Matchers ─────────────────────────────────────────────────────────────
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
