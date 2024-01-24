'use client';

import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import classes from './HeaderBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CartShopping from '../CartShopping/CartShopping';
import { useSession, signOut, signIn } from 'next-auth/react';
import * as fromReducer from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { syncCartLocalStore } from '@/store/slices/cartShoppingSlice';

export default function HeaderBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedItem: number = useSelector(fromReducer.selectCartItemCount);

  const isSignedIn = status === 'authenticated';
  const isAdmin = session?.user?.isAdmin;

  useEffect(() => {
    setTimeout(() => {
      dispatch(syncCartLocalStore());
    }, 100);
  }, []);

  const showCartDetailHandler = () => {
    router.push('/cart');
  };

  return (
    <Navbar fluid className={classes.navBar}>
      <Navbar.Brand href="/">
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
          <CartShopping
            selectedItem={selectedItem}
            onShowCartDetail={showCartDetailHandler}
          ></CartShopping>
        </div>

        {isSignedIn && session ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{session.user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {session.user?.email}
              </span>
            </Dropdown.Header>
            <Link href={`/users/${session.user?.id}`}>
              <Dropdown.Item>View profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Button type="button" className='mr-2' onClick={() => signIn()}>
            Login
          </Button>
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
