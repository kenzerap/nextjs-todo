import { withAuth } from 'next-auth/middleware';
import { User } from './models/user.model';

const publicPath = ['/login', '/signup', '/products', '/', '/api/users/signup'];

const adminPath = ['/users'];

export default withAuth(
  // function middleware(req) {
  // },
  {
    secret: process.env.AUTH_SECRET,
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (publicPath.includes(path) || path.includes('/api/')) {
          return true;
        }

        if (!token) {
          return false;
        }

        const session = token;
        const isAdmin: boolean = !!(session?.user as User)?.isAdmin;

        if (adminPath.includes(path) && !isAdmin) {
          return false;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
