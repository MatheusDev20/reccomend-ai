'use client';

import { Header } from '@repo/ui/header';
import { useTheme } from '../context/theme-context';

export default function RecomendationsLayout({
  children, // Page Outlet
}: {
  children: React.ReactNode,
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen" data-theme={theme}>
      <Header
        className="flex p-3 md:p-4 border border-b-1 items-center w-full min-h-[50px] justify-between"
        theme={theme}
        toogleTheme={toggleTheme}
      />
      {children}
    </main>
  );
}
