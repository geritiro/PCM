import React from 'react';
import { Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';

interface MaintenanceFilterProps {
  selectedYear: number;
  selectedMonth: number;
  selectedEquipment1: string;
  selectedEquipment2: string;
  selectedEquipment3: string;
  onFilterChange: (filters: any) => void;
  getAvailableEquipments: (equipmentNumber: 1 | 2 | 3) => Array<{ id: string; name: string; }>;
}

const MONTHS = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' }
];

const commonSelectStyles = {
  '& .MuiInputBase-root': {
    height: 42,
    fontSize: '0.95rem',
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.95rem',
    backgroundColor: 'white',
    padding: '0 4px',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
  },
  '& .MuiMenuItem-root': {
    fontSize: '0.95rem',
  },
};

export const MaintenanceFilter: React.FC<MaintenanceFilterProps> = ({
  selectedYear,
  selectedMonth,
  selectedEquipment1,
  selectedEquipment2,
  selectedEquipment3,
  onFilterChange,
  getAvailableEquipments,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const getFilteredEquipments = (equipmentNumber: 1 | 2 | 3) => {
    const selectedEquipments = [selectedEquipment1, selectedEquipment2, selectedEquipment3];
    const allEquipments = getAvailableEquipments(equipmentNumber);
    
    return allEquipments.filter(eq => {
      const currentEquipment = selectedEquipments[equipmentNumber - 1];
      const otherSelections = selectedEquipments.filter((_, index) => index !== equipmentNumber - 1);
      return !otherSelections.includes(eq.id) || eq.id === currentEquipment;
    });
  };

  const handleEquipmentChange = (equipmentNumber: 1 | 2 | 3) => (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const filterKey = `equipment${equipmentNumber}` as 'equipment1' | 'equipment2' | 'equipment3';
    onFilterChange({ [filterKey]: value });
  };

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ 
        width: '100%',
        alignItems: { xs: 'stretch', sm: 'center' },
        '& .MuiFormControl-root': {
          flex: 1,
          minWidth: { xs: '100%', sm: 120 },
          maxWidth: { sm: 160 }
        }
      }}
    >
      <FormControl size="small" sx={{ ...commonSelectStyles }}>
        <InputLabel id="year-label">Ano</InputLabel>
        <Select
          labelId="year-label"
          value={selectedYear}
          label="Ano"
          onChange={(e) => onFilterChange({ year: e.target.value })}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 }
            }
          }}
        >
          {years.map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ ...commonSelectStyles }}>
        <InputLabel id="month-label">Mês</InputLabel>
        <Select
          labelId="month-label"
          value={selectedMonth}
          label="Mês"
          onChange={(e) => onFilterChange({ month: e.target.value })}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 }
            }
          }}
        >
          {MONTHS.map(month => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ ...commonSelectStyles }}>
        <InputLabel id="equipment1-label">Equip. 1</InputLabel>
        <Select
          labelId="equipment1-label"
          value={selectedEquipment1}
          label="Equip. 1"
          onChange={handleEquipmentChange(1)}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 }
            }
          }}
        >
          <MenuItem value="" sx={{ color: 'text.secondary' }}>
            <em>Nenhum</em>
          </MenuItem>
          {getFilteredEquipments(1).map(eq => (
            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ ...commonSelectStyles }}>
        <InputLabel id="equipment2-label">Equip. 2</InputLabel>
        <Select
          labelId="equipment2-label"
          value={selectedEquipment2}
          label="Equip. 2"
          onChange={handleEquipmentChange(2)}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 }
            }
          }}
        >
          <MenuItem value="" sx={{ color: 'text.secondary' }}>
            <em>Nenhum</em>
          </MenuItem>
          {getFilteredEquipments(2).map(eq => (
            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ ...commonSelectStyles }}>
        <InputLabel id="equipment3-label">Equip. 3</InputLabel>
        <Select
          labelId="equipment3-label"
          value={selectedEquipment3}
          label="Equip. 3"
          onChange={handleEquipmentChange(3)}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 }
            }
          }}
        >
          <MenuItem value="" sx={{ color: 'text.secondary' }}>
            <em>Nenhum</em>
          </MenuItem>
          {getFilteredEquipments(3).map(eq => (
            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
