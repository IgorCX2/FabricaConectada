import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export default function middleware(request: NextRequest) {
    const valueToken = request.cookies.get('token')?.value
    const urlLogin = new URL('/autenticar/entrar', request.url)
    const urlDefault = new URL('/', request.url)
    const isPublic = ['/autenticar/entrar', '/autenticar/cadastrar'].some((path) => request.nextUrl.pathname.startsWith(path))
    if (!valueToken && !isPublic) {
      return NextResponse.redirect(urlLogin)
    }
    if (valueToken && request.nextUrl.pathname.startsWith('/autenticar/')) {
      return NextResponse.redirect(urlDefault)
    }
    // if (request.nextUrl.pathname.startsWith('/qualidade/Q0003')) {
    //   return NextResponse.rewrite(new URL('/qualidade/Q0002', request.url))
    // }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
