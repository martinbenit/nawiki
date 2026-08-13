import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { createServerClient } from '@supabase/ssr'

const locales = ['en', 'es-AR']
const defaultLocale = 'es-AR'

function getLocale(request: NextRequest) {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }
  
  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  return match(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  let currentLocale = defaultLocale

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    currentLocale = locale
    request.nextUrl.pathname = `/${locale}${pathname}`
    response = NextResponse.redirect(request.nextUrl)
  } else {
    currentLocale = pathname.split('/')[1]
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isHubRoute = pathname.includes('/hub')
  if (isHubRoute && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = `/${currentLocale}/login`
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
}
