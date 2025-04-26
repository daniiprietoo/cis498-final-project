'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MONTH_LABELS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

export default function RevenueChart({ orders }) {
  const monthlyRevenue = new Array(12).fill(0);
  orders.forEach(o => {
    const m = new Date(o.orderDate).getMonth();
    monthlyRevenue[m] += parseFloat(o.total);
  });

  const data = {
    labels: MONTH_LABELS,
    datasets: [{
      label: 'Revenue',
      data: monthlyRevenue,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16,185,129,0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ({ parsed: { y } }) => `$${y.toFixed(2)}` }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: v => `$${v}` }
      }
    }
  };

  return <Line data={data} options={options} />;
}