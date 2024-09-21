import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPiublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",

])
  
const isPublicApiRoute = createRouteMatcher([
  "/api/doctors",
])

export default clerkMiddleware((auth, req) => {
  const { userId } = auth()
  const currentUrl = new URL(req.url)

 const isHomePage = currentUrl.pathname === '/'
 const isApiRequest = currentUrl.pathname.startsWith("/api")

 if(userId && isPiublicRoute(req) && !isHomePage ) {
  return NextResponse.redirect(new URL("/", req.url))
 }

 if(!userId) {
    if(!isPiublicRoute && !isPublicApiRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
    
  }

  if(isApiRequest && !isPublicApiRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in'))
  }
 }

 return NextResponse.next()
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}