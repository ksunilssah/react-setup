import React from 'react';
import { lightTheme } from '../../styles/themes';

export const useTheme = () => ({
  theme: lightTheme,
  toggleTheme: jest.fn(),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
