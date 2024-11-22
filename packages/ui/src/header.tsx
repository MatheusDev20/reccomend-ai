'use client';

import { OutlineMoon } from './icons/outline-moon';

type HeaderProps = {
  className: string,
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <h1 className="ui-text-red-700">Toogle</h1>
      <OutlineMoon />
      {/* <OutlineMoon /> */}
    </header>
  );
};
