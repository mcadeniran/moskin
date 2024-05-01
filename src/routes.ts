/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  '/',
  '/shop',
  '/cart',
  '/products',
  '/api/featured',
];

/**
 * An array of nested routes that are accessible to the public
 * There routes do not require authentication
 * @type {string}
 */

export const publicNestedRoutes = '/products';

/**
 * An array of routes that are used for authentication
 * These routes do will redirect logged in users to /admin/settings
 * @type {string[]}
 */
export const authRoutes = ['/login', '/register', '/reset', '/new-password'];

/**
 * The prefix for accessible API routes without authentication
 * Routes that start with this prefix are allowed by default
 *@type {string}
 */
export const allowedApiPrefix = '/api/product';

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The prefix for Admin pages.
 * Only authorized users with Admin role can access these pages
 * @type {string}
 */
export const adminRoutePrefix = '/admin';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
