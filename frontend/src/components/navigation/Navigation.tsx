import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';

const navigationItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Ordens de Serviço', path: '/ordens-servico', icon: <BuildIcon /> },
  { label: 'Solicitações', path: '/solicitacoes', icon: <AssignmentIcon /> },
  { label: 'Planos', path: '/planos', icon: <EventNoteIcon /> },
  { label: 'Inventário', path: '/inventario', icon: <InventoryIcon /> },
  { label: 'Métricas', path: '/metricas/falhas', icon: <BarChartIcon /> },
];

export const Navigation: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        ml: 4,
        '& .MuiButton-root': {
          textTransform: 'none',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&.Mui-focusVisible': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      }}
    >
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          startIcon={item.icon}
          onClick={() => navigate(item.path)}
          sx={{
            px: 1.5,
            py: 0.75,
            minHeight: 40,
            fontSize: '0.875rem',
            fontWeight: location.pathname === item.path ? 600 : 400,
            borderRadius: 1,
            ...(location.pathname === item.path && {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }),
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};
