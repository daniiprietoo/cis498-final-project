'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MONTH_LABELS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

export default function SalesChart({ orders }) {
  const monthlySales = new Array(12).fill(0);

  orders.forEach(o => {
    const month = new Date(o.orderDate).getMonth();
    monthlySales[month]++;
  });

  const data = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Sales',
        data: monthlySales,
        backgroundColor: '#f97316'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: { label: ctx => `${ctx.parsed.y} sales` }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return <Bar data={data} options={options} />;
}