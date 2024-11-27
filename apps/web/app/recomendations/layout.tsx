'use client';

import { Header } from '@repo/ui/header';
import { useTheme } from '../context/theme-context';
import Link from 'next/link';

export default function RecomendationsLayout({
  children, // Page Outlet
}: {
  children: React.ReactNode,
}) {
  const { theme, changeTheme } = useTheme();
  return (
    <main className="min-h-screen">
      <Header
        className="flex dark:black-tone-6 py-3 px-3 pl-6 pr-4 md:p border dark:border-b-[0.5px] dark:border-reddit-gray-main border-l-0 border-r-0 border-t-0 items-center w-full min-h-[50px] justify-between"
        theme={theme}
        homeLink={<Link href="/recomendations">Recomenda AI</Link>}
        toogleTheme={changeTheme}
      />
      {children}
    </main>
  );
}
