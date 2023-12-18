import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// setting up an authMiddleware with a configuration that specifies which routes are public.
//In this case, all routes starting with /api/webhooks are designated as public and will not require authentication when accessed. 
// This could be particularly useful for routes that are meant to be accessed by external services like webhook endpoints, where authentication might not be necessary or handled differently.

// "/" is for the user to be able to land on the home page without the need to sign-in 
export default authMiddleware({
    publicRoutes: ["/", "/api/webhooks(.*)", "/api/uploadthing","/:username"]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
