'use client';

import { OutlineMoon } from './icons/outline-moon';
import { SolidMoon } from './icons/solid-moon';

type HeaderProps = {
  className: string,
  theme: 'cupkake' | 'dark' | string,
  toogleTheme: () => void,
  homeLink: React.ReactNode,
};

export const Header = ({
  className,
  theme,
  toogleTheme,
  homeLink,
}: HeaderProps) => {
  return (
    <header className={className}>
      {homeLink}
      {theme === 'cupcake' ? (
        <OutlineMoon actionFn={toogleTheme} />
      ) : (
        <SolidMoon actionFn={toogleTheme} />
      )}

      {/* <OutlineMoon /> */}
    </header>
  );
};
