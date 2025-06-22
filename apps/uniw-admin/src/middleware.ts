import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── Middleware principal ────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  // Verifica se o usuário tem um token de autenticação
  const token = request.cookies.get('token')?.value

  // Se o usuário não tem token e está tentando acessar a área do painel,
  // redireciona para a página de login.
  if (!token && pathname.startsWith('/painel')) {
    url.pathname = '/auth/entrar'
    return NextResponse.redirect(url)
  }

  // Se o usuário tem um token e tenta acessar a página de login,
  // redireciona para a página inicial do painel para evitar login duplicado.
  if (token && pathname === '/auth/entrar') {
    url.pathname = '/painel/inicio'
    return NextResponse.redirect(url)
  }

  // Permite que a requisição continue para os outros casos
  return NextResponse.next()
}

// ─── Matchers ─────────────────────────────────────────────────────────────
export const config = {
  /*
   * Executa o middleware em todas as rotas, exceto aquelas que são
   * para arquivos estáticos (assets), imagens ou chamadas de API.
   * Isso garante que a verificação de autenticação ocorra apenas nas páginas.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
