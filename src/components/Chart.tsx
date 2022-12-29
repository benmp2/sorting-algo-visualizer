import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function BarChart() {

    const arraySize = 40;
    let randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 40));
    let index = Array.from({ length: arraySize }, (x, i) => i);

    let data = {
        labels: index,
        datasets: [
            {
                label: 'Random Array',
                data: randomArray,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };
    return < Bar data={data} />;
}

export default BarChart;