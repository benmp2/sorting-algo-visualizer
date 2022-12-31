import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function BarChart() {
    const ANIMATION_SPEED_IN_MS = 200;
    const arraySize = 19;
    const primaryColor = 'rgba(255, 99, 132, 0.5)';
    const secondaryColor = 'rgba(132, 99, 255, 1)'
    let initRandomArray = Array.from({ length: arraySize }, () => getRandomInt(3, arraySize));
    let index = Array.from({ length: arraySize }, (x, i) => i);

    const [dataSet, setDataSet] = useState({
        label: 'Array',
        data: initRandomArray,
        backgroundColor: Array.from({ length: initRandomArray.length }, () => primaryColor),
    });

    let chartData = {
        labels: index,
        datasets: [
            dataSet,
        ]
    }

    function getBubbleSortAnimations(array: number[]) {
        let animations: { label: string, data: number[], backgroundColor: string[] }[] = [];

        const arr: number[] = Array.from(array); // avoid side effects
        for (let i = 1; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i; j++) {

                if (arr[j] > arr[j + 1]) {
                    let listOfColors = Array.from({ length: arr.length }, () => primaryColor);
                    listOfColors[j] = secondaryColor
                    listOfColors[j + 1] = secondaryColor
                    animations.push({
                        label: 'Array',
                        data: arr.slice(),
                        backgroundColor: listOfColors,
                    });
                    listOfColors = Array.from({ length: arr.length }, () => primaryColor);
                    animations.push({
                        label: 'Array',
                        data: arr.slice(),
                        backgroundColor: listOfColors,
                    });
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    listOfColors[j] = secondaryColor
                    listOfColors[j + 1] = secondaryColor
                    animations.push({
                        label: 'Array',
                        data: arr.slice(),
                        backgroundColor: listOfColors,
                    });

                    listOfColors = Array.from({ length: arr.length }, () => primaryColor);
                    animations.push({
                        label: 'Array',
                        data: arr.slice(),
                        backgroundColor: listOfColors,
                    })

                }
            }
        }


        return animations; //[animations, currentElements];
    }

    useEffect(() => {
        const animations = getBubbleSortAnimations(initRandomArray)
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                setDataSet(animations[i]);
            }, i * ANIMATION_SPEED_IN_MS)
        }
    }, []) // the second argument `[]` of useEffect ensures useEffect only runs once!
    const options = {
        events: [],
        animation: {
            duration: 0
        },
        spanGaps: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        },
        plugins: {
            legend:
            {
                display: false
            },
            tooltip: {
                enabled: false
            },
        }
    }

    return <Bar options={options} data={chartData} redraw={false} />;
}

export default BarChart;