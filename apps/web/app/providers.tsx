'use client';

import { ThemeProvider } from './context/theme-context';
import ClientThemeWrapper from './providers/client-theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ClientThemeWrapper>{children}</ClientThemeWrapper>
    </ThemeProvider>
  );
}
