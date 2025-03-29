import { NextResponse } from 'next/server'

export function middleware(req: Request) {
  const url = new URL(req.url)
  
  // Condition to redirect all unrecognized URLs to the 404 page
  if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next')) {
    return NextResponse.rewrite(new URL('/', req.url))
  }

  return NextResponse.next()
}