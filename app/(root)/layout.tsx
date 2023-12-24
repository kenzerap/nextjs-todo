import HeaderBar from '@/components/HeaderBar/HeaderBar';
import { Fragment } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <div className="m-8">{children}</div>
    </Fragment>
  );
}
