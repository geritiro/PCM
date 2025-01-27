import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { MonetizationOn as MonetizationOnIcon } from '@mui/icons-material';

interface TotalCardProps {
  month: string;
  value: number;
  variant?: 'card' | 'text';
  showIcon?: boolean;
}

export const TotalCard: React.FC<TotalCardProps> = ({ 
  month, 
  value,
  variant = 'card',
  showIcon = true
}) => {
  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  if (variant === 'text') {
    return (
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2" color="text.secondary">
          Total em {month}
        </Typography>
        <Typography variant="h6" color="success.main" sx={{ fontWeight: 500 }}>
          {formattedValue}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        border: '1px solid',
        borderColor: 'success.light',
        bgcolor: 'success.lighter',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {showIcon && (
        <MonetizationOnIcon 
          color="success" 
          sx={{ fontSize: '1.5rem' }} 
        />
      )}
      <Box>
        <Typography 
          variant="caption" 
          color="success.dark"
          sx={{ display: 'block' }}
        >
          Total em {month}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="success.dark"
          sx={{ fontWeight: 500, lineHeight: 1 }}
        >
          {formattedValue}
        </Typography>
      </Box>
    </Paper>
  );
};
