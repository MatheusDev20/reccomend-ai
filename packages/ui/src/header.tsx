'use client';

type HeaderProps = {
  className: string,
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <h3>Recomenda AI</h3>
    </header>
  );
};
