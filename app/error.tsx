'use client';

import { Button } from 'flowbite-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Error({ error }: { error: Error }) {
  if (error.message === 'unAuthorized') {
    signOut({ callbackUrl: '', redirect: false });
    error.message = `You aren't authorized to access this page.`;
  }

  return (
    <Fragment>
      <div className="text-center text-5xl mt-8">
        {error.message
          ? error.message
          : 'Opp! Something went wrong. Please try again'}
      </div>
      <div className="flex items-center justify-center mt-8">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </Fragment>
  );
}
