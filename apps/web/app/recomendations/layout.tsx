'use client';

import { Header } from '@repo/ui/header';
import { useTheme } from '../context/theme-context';
import Link from 'next/link';
import { HeaderNavigation } from '../components/header-navigation ';
import { useState } from 'react';

export default function RecomendationsLayout({
  children, // Page Outlet
}: {
  children: React.ReactNode,
}) {
  const { theme, changeTheme } = useTheme();
  const [isToggled, setIsToggled] = useState(false);
  return (
    <main className="min-h-screen">
      <Header
        theme={theme}
        homeLink={<Link href="/recomendations">Recomenda AI</Link>}
        navigation={<HeaderNavigation isToggled={isToggled} />}
        toogleTheme={changeTheme}
        toggleNav={() => setIsToggled(!isToggled)}
        isToggled={isToggled}
      />
      {children}
    </main>
  );
}
