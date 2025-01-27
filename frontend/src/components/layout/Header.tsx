import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Stack,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import {
  NotificationsActive,
  Settings,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { UserMenu } from './UserMenu';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Navigation } from '../navigation/Navigation';
import LogoPCM from '../../assets/logo.svg';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: '#2196f3',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ minHeight: '64px', px: 2 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <img
              src={LogoPCM}
              alt="PCM Logo"
              style={{
                height: 32,
                width: 'auto',
              }}
            />

            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                color: '#fff',
                fontWeight: 500,
              }}
            >
              Sistema PCM
            </Typography>
          </Box>

          {!isMobile && <Navigation />}

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsActive />
              </Badge>
            </IconButton>

            <IconButton 
              onClick={handleOpenUserMenu} 
              sx={{ 
                p: 0,
                ml: 1,
                border: '2px solid rgba(255,255,255,0.8)',
                borderRadius: '50%',
              }}
            >
              <Avatar 
                alt={user?.name || 'User'} 
                src={user?.avatar}
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.dark',
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>

            <IconButton 
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Settings />
            </IconButton>
          </Stack>

          <UserMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          />
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              width: 240,
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <Toolbar />
          <Navigation />
        </Drawer>
      )}
    </>
  );
};
