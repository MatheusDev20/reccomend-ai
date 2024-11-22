import { createContext, useContext, useState } from 'react';
import {
  getLocalStorageByKey,
  setLocalStorageByKey,
} from '../utils/local-storage';

type Props = {
  children: React.ReactNode,
};

type ContextProps = {
  theme: string,
  toggleTheme: () => void,
};

const ThemeContext = createContext<ContextProps | null>(null);

const { Provider } = ThemeContext;

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = getLocalStorageByKey({ key: 'theme', parse: false });
    if (!storedTheme)
      setLocalStorageByKey({
        key: 'theme',
        value: 'cupcake',
        stringify: false,
      });

    return (storedTheme as string) || 'cupcake';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'cupcake' ? 'dark' : 'cupcake'));
  };

  return <Provider value={{ theme, toggleTheme }}>{children}</Provider>;
};

const useTheme = (): ContextProps => {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useTheme must be used within a Provider');
  }

  return context;
};

export { ThemeProvider, useTheme };
