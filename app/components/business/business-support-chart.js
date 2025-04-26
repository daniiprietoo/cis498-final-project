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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTH_LABELS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

export default function SupportChart({ requests }) {
  const monthlyRequests = new Array(12).fill(0);
  requests.forEach(r => {
    const m = new Date(r.createdAt).getMonth();
    monthlyRequests[m]++;
  });

  const data = {
    labels: MONTH_LABELS,
    datasets: [{
      label: 'Support Requests',
      data: monthlyRequests,
      backgroundColor: '#3B82F6'
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => `${ctx.parsed.y} requests` }
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