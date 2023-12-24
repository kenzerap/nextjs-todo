'use client';

import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import classes from './HeaderBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function HeaderBar() {
  const userInfo: any = null;
  const pathname = usePathname();
  const router = useRouter();

  const logOutHandeler = () => {
    // dispatch(logout());
    router.push('/');
  };

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
          ReactPee
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {userInfo ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{userInfo.name}</span>
              <span className="block truncate text-sm font-medium">
                {userInfo.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Edit profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOutHandeler}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href={'/login'}>
            <Button type="button">Login</Button>
          </Link>
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
      </Navbar.Collapse>
    </Navbar>
  );
}
