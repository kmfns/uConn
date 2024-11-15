import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// You can specify routes to protect in the `matcher` export
export const config = {
  matcher: ['/((?!api/uploadthing).*|/)', '/(api|trpc)(.*)'], // Define which routes Clerk middleware should apply to
};
