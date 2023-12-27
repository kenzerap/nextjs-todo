'use client';

import { Button, Navbar } from 'flowbite-react';
import classes from './HeaderBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import CartShopping from '../CartShopping/CartShopping';

export default function HeaderBar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();

  const isAdmin = user?.publicMetadata.role === 'admin';

  return (
    <Navbar fluid className={classes.navBar}>
      <Navbar.Brand>
        <Image
          src="https://www.flowbite-react.com/favicon.svg"
          alt="Flowbite React Logo"
          quality={100}
          width={35}
          height={35}
          className="mr-3 h-6 sm:h-9"
        />

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          NextPee
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="mr-8">
          <CartShopping selectedItem={0}></CartShopping>
        </div>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton>
            <Button type="button">Login</Button>
          </SignInButton>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link
          href={'/'}
          className={`${classes.link} ${
            pathname === '/' ? classes.linkActive : ''
          }`}
        >
          Home
        </Link>
        <Link
          href={'/products'}
          className={`${classes.link} ${
            pathname.includes('/products') ? classes.linkActive : ''
          }`}
        >
          Products
        </Link>
        {isAdmin && (
          <Link
            href={'/users'}
            className={`${classes.link} ${
              pathname.includes('/users') ? classes.linkActive : ''
            }`}
          >
            Users
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
