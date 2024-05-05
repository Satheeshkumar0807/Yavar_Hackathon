import React from 'react';
import { BarChart } from '@mui/x-charts';

const StatsBarChart = ({ stats }) => {
  if (!stats) {
    return null;
  }

  const data = [
    { group: 'Completed', count: stats.completed },
    { group: 'Overdue', count: stats.overdue },
    { group: 'Pending', count: stats.pending },
    { group: 'Total', count: stats.total }
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.map(item => item.group) }]}
      series={[{ data: data.map(item => item.count) }]}
      width={500}
      height={300}
    />
  );
};

export default StatsBarChart;
