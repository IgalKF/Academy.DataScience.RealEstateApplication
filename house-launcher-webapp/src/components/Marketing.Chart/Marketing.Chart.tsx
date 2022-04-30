import { useSpring } from 'react-spring';
import * as styles from './Marketing.Chart.Styles';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import faker from '@faker-js/faker';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Welcome To House Launcher!',
      },
    },
  };

  const labels = ['Rishon Le-Zion', 'Ha-Savion', 'Holon', 'Be\'er Ya\'akov', 'Beit-Dagan', 'Bat-Yam', 'Or-Yehuda'];

  export const data = {
    labels,
    datasets: [
      {
        label: 'Nearby Area',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Target Area',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const MarketingChart = () => {

    return (
        <div style={styles.marketingChartStyle}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default MarketingChart;