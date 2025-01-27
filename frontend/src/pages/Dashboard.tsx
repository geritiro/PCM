import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Container
} from '@mui/material';
import {
  MonetizationOn as MonetizationOnIcon,
  Engineering as EngineeringIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
  Update as UpdateIcon,
  Pending as PendingIcon,
  Add as AddIcon,
  Insights as InsightsIcon,
  Message as MessageIcon,
  Build as BuildIcon,
  Settings as SettingsIcon,
  Paid as PaidIcon
} from '@mui/icons-material';
import { MetricCard } from '../components/MetricCard';
import { MaintenanceFilter } from '../components/filters/MaintenanceFilter';
import { MaintenanceCostChart } from '../components/charts/MaintenanceCostChart';
import { TotalCard } from '../components/TotalCard';
import { MAINTENANCE_AREAS, MaintenanceArea } from '../types/maintenance';
import inventory from '../data/inventory.json';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const Dashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    equipment1: '',
    equipment2: '',
    equipment3: '',
  });
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedGraphArea, setSelectedGraphArea] = useState<MaintenanceArea>('TODAS');

  // Dados mockados para os totais
  const mockTotalData = {
    totalGeral: 89674.75,
    totalPorArea: {
      'TODAS': 89674.75,
      'MECÂNICA': 15600.00,
      'ELÉTRICA': 28900.00,
      'HIDRÁULICA': 8874.75,
      'ELETRÔNICA': 12500.00,
      'PNEUMÁTICA': 7500.00,
      'INSTRUMENTAÇÃO': 9800.00,
      'AUTOMAÇÃO': 6500.00,
    }
  };

  const handleFilterChange = (filters: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      ...filters
    }));
  };

  const handleGraphAreaChange = (event: SelectChangeEvent) => {
    setSelectedGraphArea(event.target.value as MaintenanceArea);
  };

  const getAvailableEquipments = (equipmentNumber: 1 | 2 | 3) => {
    // Simulando uma lista de equipamentos
    return [
      { id: '', name: 'Nenhum' },
      { id: 'PRENSA P2', name: 'PRENSA P2' },
      { id: 'PRENSA P3', name: 'PRENSA P3' },
      { id: 'TORNO CNC', name: 'TORNO CNC' },
      { id: 'FRESA', name: 'FRESA' },
    ];
  };

  const getSelectedEquipments = () => {
    return Object.values(selectedFilters).filter(Boolean);
  };

  // Calcula o total atual baseado nos filtros
  const currentTotal = useMemo(() => {
    const baseTotal = mockTotalData.totalGeral;
    const selectedEquips = getSelectedEquipments();
    return selectedEquips.length > 0 
      ? baseTotal * (selectedEquips.length / 3) 
      : baseTotal;
  }, [selectedFilters]);

  // Calcula o total do gráfico baseado na área selecionada
  const graphTotal = useMemo(() => {
    return mockTotalData.totalPorArea[selectedGraphArea] || 0;
  }, [selectedGraphArea]);

  return (
    <Container maxWidth={false} sx={{ p: 3 }}>
      {/* Cabeçalho com título e total */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
      }}>
        <Typography variant="h4" component="h1">
          Dashboard PCM
        </Typography>
        
        <TotalCard
          title="Total em Janeiro"
          value={currentTotal}
          sx={{
            minWidth: 250,
            height: 'auto',
            '& .MuiCardContent-root': {
              py: 1,
            },
          }}
        />
      </Box>

      {/* Linha de botões e filtros */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        mb: 3,
      }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          sx={{ 
            width: { xs: '100%', md: 'auto' },
            minWidth: { md: '420px' },
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ 
              textTransform: 'none',
              height: 42,
              fontSize: '0.95rem',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
              '&.Mui-focusVisible': {
                outline: 'none',
                boxShadow: 'none',
              },
              '& .MuiButton-startIcon': {
                marginRight: 1,
              },
            }}
          >
            Nova OS
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ 
              bgcolor: '#9c27b0',
              '&:hover': {
                bgcolor: '#7b1fa2',
              },
              textTransform: 'none',
              height: 42,
              fontSize: '0.95rem',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
              '&.Mui-focusVisible': {
                outline: 'none',
                boxShadow: 'none',
              },
              '& .MuiButton-startIcon': {
                marginRight: 1,
              },
            }}
            startIcon={<InsightsIcon />}
          >
            Insights
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MessageIcon />}
            fullWidth
            sx={{ 
              textTransform: 'none',
              height: 42,
              fontSize: '0.95rem',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
              '&.Mui-focusVisible': {
                outline: 'none',
                boxShadow: 'none',
              },
              '& .MuiButton-startIcon': {
                marginRight: 1,
              },
            }}
          >
            Mensagem
          </Button>
        </Stack>

        <Box sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}>
          <MaintenanceFilter
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedEquipment1={selectedFilters.equipment1 || ''}
            selectedEquipment2={selectedFilters.equipment2 || ''}
            selectedEquipment3={selectedFilters.equipment3 || ''}
            onFilterChange={handleFilterChange}
            getAvailableEquipments={getAvailableEquipments}
          />
        </Box>
      </Box>

      {/* Grid de cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Coluna da Esquerda - 40% */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="OS Críticas"
                value="5"
                icon={<MonetizationOnIcon />}
                subtitle="Necessitam atenção imediata"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="Total de OS em Aberto"
                value="28"
                icon={<EngineeringIcon />}
                subtitle={`${MONTHS[selectedMonth - 1]}/${selectedYear}`}
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="OS em Andamento"
                value="12"
                icon={<SpeedIcon />}
                subtitle="Em execução"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="Disponibilidade"
                value="98.5%"
                icon={<TimelineIcon />}
                subtitle="Disponibilidade de Equipamentos"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="MTBF"
                value="120h"
                icon={<UpdateIcon />}
                subtitle="Tempo Médio entre Falhas"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="MTTR"
                value="4h"
                icon={<PendingIcon />}
                subtitle="Tempo Médio de Reparo"
                showInfo
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Coluna da Direita - Gráfico - 60% */}
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2,
              height: { xs: 'auto', md: '400px' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}>
              <Typography variant="h6" component="h2">
                Custos por Área de Manutenção
              </Typography>
              
              <FormControl 
                size="small" 
                sx={{ 
                  minWidth: 200,
                  ml: { sm: 'auto' },
                }}
              >
                <InputLabel>Área</InputLabel>
                <Select
                  value={selectedGraphArea}
                  label="Área"
                  onChange={handleGraphAreaChange}
                >
                  <MenuItem value="TODAS">Todas</MenuItem>
                  {MAINTENANCE_AREAS.map(area => (
                    <MenuItem key={area} value={area}>{area}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
              <MaintenanceCostChart
                selectedArea={selectedGraphArea}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                selectedEquipments={getSelectedEquipments()}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
