export const MAINTENANCE_AREAS = [
  'TODAS',
  'MECÂNICA',
  'ELÉTRICA',
  'HIDRÁULICA',
  'ELETRÔNICA',
  'PNEUMÁTICA',
  'INSTRUMENTAÇÃO',
  'AUTOMAÇÃO'
] as const;

export const MAINTENANCE_TYPES = [
  'CORRETIVA',
  'PREVENTIVA',
  'PREDITIVA'
] as const;

export const MAINTENANCE_STATUS = [
  'EM ANDAMENTO',
  'CRÍTICA',
  'CONCLUÍDA',
  'PENDENTE',
  'ATRASADA',
  'PLANEJADA'
] as const;

export type MaintenanceArea = typeof MAINTENANCE_AREAS[number];
export type MaintenanceType = typeof MAINTENANCE_TYPES[number];
export type MaintenanceStatus = typeof MAINTENANCE_STATUS[number];

export interface MaintenanceCost {
  area: MaintenanceArea;
  month: number;
  year: number;
  value: number;
}

export interface EquipmentCost {
  equipment: string;
  month: number;
  year: number;
  value: number;
}
