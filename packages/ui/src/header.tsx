'use client';
import { ThemeSwitch } from './theme-switch';

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
      <div>{homeLink}</div>
      <div>
        <ThemeSwitch currentTheme={theme} toggle={toogleTheme} />
      </div>
    </header>
  );
};
