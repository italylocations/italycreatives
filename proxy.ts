import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const isApply = hostname.startsWith('apply.')

  if (isApply) {
    const pathname = request.nextUrl.pathname
    // Never rewrite API routes — they must resolve directly
    if (pathname.startsWith('/api/')) {
      return NextResponse.next()
    }
    // apply.italycreatives.com/          → /apply
    // apply.italycreatives.com/apply     → /apply/apply
    // apply.italycreatives.com/thank-you → /apply/thank-you
    const rewritePath = pathname === '/' ? '/apply' : `/apply${pathname}`
    return NextResponse.rewrite(new URL(rewritePath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon).*)'],
}
