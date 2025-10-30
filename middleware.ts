import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require an authenticated session
const protectedPaths = new Set(['/dashboard', '/admin', '/upload'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if path starts with any protected route
  const isProtected = Array.from(protectedPaths).some((p) =>
    pathname === p || pathname.startsWith(p + '/')
  )

  if (!isProtected) return NextResponse.next()

  // Supabase auth sets access/refresh cookies. Presence is good enough for gating UI routes.
  const hasAccessToken = request.cookies.has('sb-access-token') || request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-access-token'))

  if (!hasAccessToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/signin'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/upload/:path*'],
}


