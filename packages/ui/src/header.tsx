'use client';

import { OutlineMoon } from './icons/outline-moon';
import { SolidMoon } from './icons/solid-moon';

type HeaderProps = {
  className: string,
  theme: 'cupkake' | 'dark' | string,
  toogleTheme: () => void,
};

export const Header = ({ className, theme, toogleTheme }: HeaderProps) => {
  return (
    <header className={className}>
      <h1>Recomenda AI</h1>
      {theme === 'cupcake' ? (
        <OutlineMoon actionFn={toogleTheme} />
      ) : (
        <SolidMoon actionFn={toogleTheme} />
      )}

      {/* <OutlineMoon /> */}
    </header>
  );
};
