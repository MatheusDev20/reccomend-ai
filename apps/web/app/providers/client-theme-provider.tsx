'use client';
import { useTheme } from '../context/theme-context';

export default function ClientThemeWrapper({ children }: any) {
  const { theme } = useTheme();
  console.log('The theme is: ', theme);
  return <div data-theme={theme}>{children}</div>;
}
