import React from 'react';
import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/server';
import HeaderDropdown from '@/components/headerDropdown';

interface HeaderProps {
  title: string;
  isViewMode?: boolean;
}

export default async function Header({ title, isViewMode = false }: HeaderProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get domain for logged-in users
  let domain = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('domain')
      .eq('user_id', user.id)
      .single();

    domain = profile?.domain;
  }

  return (
    <header className="w-full bg-[#9185FF] px-6 py-4 flex fixed top-0 items-center justify-between z-100">
      {user ? (
        <form action={logout}>
          <button
            type="submit"
            className="text-white hover:text-gray-200 transition-colors text-sm shadow-none"
          >
            Log out
          </button>
        </form>
      ) : (
        <Link
          href="/login"
          className="text-white hover:text-gray-200 transition-colors text-sm"
        >
          Log in
        </Link>
      )}
      <h1 className="text-white text-2xl text-center font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[50%]">{title}</h1>
      {user && domain ? (
        <HeaderDropdown domain={domain} isViewMode={isViewMode} />
      ) : (
        <div className="w-12"></div>
      )}
    </header>
  );
}