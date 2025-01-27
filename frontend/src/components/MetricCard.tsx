import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
  showInfo?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  showInfo = false,
}) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              mr: 1,
              '& svg': {
                fontSize: '1.5rem',
              }
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="subtitle1" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          {showInfo && (
            <Tooltip title="Mais informações" arrow placement="top">
              <IconButton 
                size="small" 
                sx={{ 
                  ml: 1,
                  p: 0.5,
                  color: 'action.active',
                }}
              >
                <InfoIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Typography 
          variant="h4" 
          component="div"
          sx={{ 
            fontWeight: 500,
            mb: 0.5,
            color: 'text.primary',
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
