import Link from 'next/link';
import { auth } from '@/auth';
import { SignOutBtn } from './SignOutBtn';

export const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-end p-6 bg-cyan-700 text-white">
      {session?.user && session?.user.role === 'Admin' && (
        <>
          <Link className="mr-6" href="/">
            Inicio
          </Link>
          <Link className="mr-6" href="/admin/dashboard">
            Dashboard
          </Link>
        </>
      )}
      {!session?.user ? <Link href="/login">Acceder</Link> : <SignOutBtn />}
    </nav>
  );
};
