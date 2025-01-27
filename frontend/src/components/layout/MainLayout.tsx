import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { useAppTheme } from '../../contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useAppTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          pt: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            bgcolor: theme.palette.background.default,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
