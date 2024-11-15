import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/login(.*)', '/sign-up(.*)']);
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    // This automatically ensures that the user is authenticated
    auth();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
