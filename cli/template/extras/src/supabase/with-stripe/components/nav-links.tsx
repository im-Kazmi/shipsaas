'use client';

import Link from 'next/link';
import { SignOut } from '@/features/auth/actions';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

interface NavlinksProps {
  user?: any;
}

export function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row text-white justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" aria-label="Logo">
          <Logo />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/">Pricing</Link>
          {user && <Link href="/account">Account</Link>}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit">Sign out</button>
          </form>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </div>
  );
}
