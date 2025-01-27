import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MAINTENANCE_AREAS, MaintenanceArea } from '../../types/maintenance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface MaintenanceCostChartProps {
  selectedArea: MaintenanceArea;
  selectedYear: number;
  selectedMonth: number;
  selectedEquipments: string[];
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Dados mockados para teste
const mockAreaData = {
  'MECÂNICA': [15600, 14500, 16700, 15900, 17200, 15600],
  'ELÉTRICA': [28900, 27500, 29100, 28400, 27900, 28900],
  'HIDRÁULICA': [8874, 9200, 8500, 8900, 9100, 8874],
  'ELETRÔNICA': [12500, 11900, 12800, 12300, 12600, 12500],
  'PNEUMÁTICA': [7500, 7200, 7800, 7400, 7600, 7500],
  'INSTRUMENTAÇÃO': [9800, 9500, 10100, 9700, 9900, 9800],
  'AUTOMAÇÃO': [6500, 6200, 6800, 6400, 6600, 6500],
};

const mockEquipmentData = {
  'EQ-001': [5200, 4900, 5500, 5100, 5300, 5200],
  'EQ-002': [4800, 4500, 5100, 4700, 4900, 4800],
  'EQ-003': [6200, 5900, 6500, 6100, 6300, 6200],
};

export const MaintenanceCostChart: React.FC<MaintenanceCostChartProps> = ({
  selectedArea,
  selectedYear,
  selectedMonth,
  selectedEquipments,
}) => {
  // Calcula os últimos 6 meses a partir do mês selecionado
  const semesterMonths = useMemo(() => {
    const result = [];
    let currentMonth = selectedMonth;
    let currentYear = selectedYear;

    for (let i = 0; i < 6; i++) {
      if (currentMonth === 0) {
        currentMonth = 12;
        currentYear--;
      }
      result.unshift({
        month: currentMonth,
        year: currentYear,
        label: `${MONTHS[currentMonth - 1].substring(0, 3)}/${currentYear}`
      });
      currentMonth--;
    }

    return result;
  }, [selectedMonth, selectedYear]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11,
          },
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            
            // Legendas para áreas (barras)
            const areaLabels = datasets
              .filter((dataset: any) => dataset.type === 'bar')
              .map((dataset: any, i: number) => ({
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.backgroundColor,
                lineWidth: 0,
                hidden: !dataset.visible,
                index: i,
                datasetIndex: datasets.indexOf(dataset),
                pointStyle: 'circle'
              }));

            // Legendas para equipamentos (linhas) - só exibe se houver equipamentos selecionados
            const equipmentLabels = datasets
              .filter((dataset: any) => dataset.type === 'line' && dataset.visible)
              .map((dataset: any, i: number) => ({
                text: dataset.label,
                fillStyle: 'transparent',
                strokeStyle: dataset.borderColor,
                lineWidth: 2,
                hidden: !dataset.visible,
                index: i + areaLabels.length + 1, // +1 para o espaçador
                datasetIndex: datasets.indexOf(dataset),
                pointStyle: 'line'
              }));

            // Se houver equipamentos selecionados, adiciona um espaçador entre áreas e equipamentos
            return equipmentLabels.length > 0
              ? [...areaLabels, { text: '', fillStyle: 'transparent' }, ...equipmentLabels]
              : areaLabels;
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${context.dataset.label}: ${value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: (value: number) => {
            return value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            });
          },
        },
      },
    },
  };

  const getChartData = () => {
    const labels = semesterMonths.map(m => m.label);
    const datasets = [];

    // Adiciona dados de área se selecionada
    if (selectedArea !== 'TODAS') {
      const areaData = mockAreaData[selectedArea];
      datasets.push({
        type: 'bar' as const,
        label: selectedArea,
        data: areaData,
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 50,
        visible: true,
      });
    } else {
      // Se "TODAS" estiver selecionado, mostra todas as áreas como barras
      Object.entries(mockAreaData).forEach(([area, data], index) => {
        const hue = (index * 30) % 360; // Gera cores diferentes para cada área
        datasets.push({
          type: 'bar' as const,
          label: area,
          data: data,
          backgroundColor: `hsl(${hue}, 70%, 60%)`,
          borderColor: `hsl(${hue}, 70%, 50%)`,
          borderWidth: 1,
          borderRadius: 4,
          maxBarThickness: 50,
          visible: true,
        });
      });
    }

    // Adiciona linhas para equipamentos selecionados
    selectedEquipments.forEach((equipment, index) => {
      const equipmentData = mockEquipmentData[equipment] || Array(6).fill(0);
      datasets.push({
        type: 'line' as const,
        label: `Equip. ${equipment}`,
        data: equipmentData,
        borderColor: `hsl(${index * 60 + 180}, 70%, 50%)`,
        backgroundColor: `hsl(${index * 60 + 180}, 70%, 50%)`,
        borderWidth: 2,
        tension: 0.4,
        visible: true,
      });
    });

    return { labels, datasets };
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Chart type="bar" options={options} data={getChartData()} />
    </div>
  );
};
