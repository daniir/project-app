import '../globals.css';
import type { Metadata } from 'next';
import { NavBar } from '@/components/ui/';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}