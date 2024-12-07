'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StepperDataProvider } from './context/stepper-context';
import { ThemeProvider } from './context/theme-context';
import ClientThemeWrapper from './providers/client-theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <ClientThemeWrapper>
          <StepperDataProvider>{children}</StepperDataProvider>
        </ClientThemeWrapper>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
