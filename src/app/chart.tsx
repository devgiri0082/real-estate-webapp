'use client';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Chart({dataset}: {dataset: number[]}) {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const options = {
    responsive: true,
    scale: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 5000
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        data:dataset,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div style={{ width: '70%', height: '50%' }}>
      <Line options={options} data={data} />
    </div>
  )
}