import React from 'react';
import Image from 'next/image';
import { logout } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/server';

interface HeaderProps {
  title: string;
}

export default async function Header({ title }: HeaderProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="w-full bg-[#9185FF] px-6 py-4 flex fixed top-0 items-center justify-between z-100">
      {user ? (
        <form action={logout}>
          <button
            type="submit"
            className="text-white hover:text-gray-200 transition-colors text-sm"
          >
            Log out
          </button>
        </form>
      ) : (
        <div></div>
      )}
      <h1 className="text-white text-2xl text-center font-bold">{title}</h1>
      {/* NOTE: Will need to swap with an SVG tag at some point */}
      <Image
        src='pawprint.svg'
        alt='Paw print icon'
        width={48}
        height={48}
      />
    </header>
  );
}