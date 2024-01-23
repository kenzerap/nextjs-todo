import FooterBar from '@/components/FooterBar/FooterBar';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import { Fragment } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <div className="m-8" style={{ minHeight: 'calc(100vh - 23.3rem)' }}>
        {children}
      </div>
      <FooterBar></FooterBar>
    </div>
  );
}
