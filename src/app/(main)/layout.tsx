import FooterSection from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <FooterSection />
    </div>
  );
}
