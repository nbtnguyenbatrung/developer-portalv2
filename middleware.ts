import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/login',
  // '/register',
  '/api/*',
  'api/auth',
  '/product',
  '/product/introduce/*',
  '/logo-napas.png',
  '/card.png',
  '/transfer.png',
  '/qr.png',
  '/',
  '/icon-napas.svg',
  '/contact',
  '/banner.jpg',
  '/IMG_3440.png',
  '/faq',
  '/hero-section/*',
  '/introduce/*',
    '/md/images/*'
]
const PROTECTED_PATHS = ['/dashboard', '/product/docs', '/product/apis']
const AUTH_PATH = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Handle API requests
  if (
    PUBLIC_PATHS.some((p) => {
      if (p.includes('*')) {
        const regex = new RegExp('^' + p.replace(/\*/g, '.*') + '$')
        return regex.test(pathname)
      }
      return pathname === p
    })
  ) {
    return NextResponse.next()
  }
  // Get token from NextAuth session
  const token = await getToken({
    req: request,
      secret: process.env.NEXTAUTH_SECRET,
  })
  if (!token) {
    console.log('!token=true :>> ')
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname === '/' ? '/' : pathname)
    return NextResponse.redirect(url)
  }

  const isAuthenticated = token
  console.log('isAuthenticated', isAuthenticated)

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && AUTH_PATH.some((ap) => pathname.startsWith(ap))) {
    console.log(' Redirect authenticated users away from auth pages:>> ')
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (
    isAuthenticated &&
    (pathname.endsWith('introduce') ||
      pathname.endsWith('doc') ||
      pathname.endsWith('apis') ||
      pathname.endsWith('introduce'))
  ) {
    return NextResponse.redirect(new URL('/product', request.url))
  }
  // Redirect unauthenticated users to login from protected pages
  if (
    !isAuthenticated &&
    PROTECTED_PATHS.some((pp) => pathname.startsWith(pp))
  ) {
    console.log(
      ' Redirect unauthenticated users to login from protected pages:>> ',
    )
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname === '/' ? '/' : pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
