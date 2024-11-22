'use client';

import { Header } from '@repo/ui/header';
import { MainPage } from './pages/home';
import { useTheme } from './context/theme-context';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen" data-theme={theme}>
      <Header className="flex p-3 md:p-4 items-center border border-red-600 w-full min-h-[50px] justify-between" />
      <MainPage />
    </main>
  );
}
