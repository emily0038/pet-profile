import React from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="w-full bg-[#9185FF] px-6 py-4 flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">{title}</h1>
      {/* NOTE: Will need to swap with an SVG tag at some point */}
      <img
      src='paw-print.svg'
      alt='Paw print icon'
      width='55'
      height='48'
      />
    </header>
  );
}