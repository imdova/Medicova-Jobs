import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect from root ("/") to "/login"
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}
