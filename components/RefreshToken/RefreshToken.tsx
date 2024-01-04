'use client';

import React, { Fragment } from 'react';
import { signOut } from 'next-auth/react';

export default function RefreshToken() {
  signOut({ callbackUrl: '/' });

  return <Fragment></Fragment>;
}
