import NextAuth from 'next-auth';
import { User as CustomUser } from '../models/user.model';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }

  interface User {
    token: string;
    user: CustomUser;
  }
}
