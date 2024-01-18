import user_icon from '../assets/user_icon.svg';
import LightDashboardCell from '../components/light_dashboard_cell';
import { useEffect, useState } from 'react';
import type { ChartData } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function Dashboard() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
        labels: ['Open', 'Closed'],
        datasets: [
            {
                label: 'Tickets',
                data: [],
                backgroundColor: [
                    '#9fb734',
                    '#9fb73488',
                ],
                borderColor: [
                    '#9fb734',
                    '#9fb73488',
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    '#9fb734cc',
                    '#9fb73466',
                ]
            },
        ]
    });
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Tickets over time'
            },
        },
    };
    useEffect(() => {
        let data = chartData;
        data.datasets[0].data = [1, 2];
        setChartData(data);
    }, []);
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5'>
            <LightDashboardCell title='Open Tickets' value={2} comparedValue={4} />
            <LightDashboardCell title='Closed Tickets' value={1} comparedValue={1} />
            <LightDashboardCell title='Days until next Sprint' value={1} comparedValue={3} />
            <LightDashboardCell title="Tickets this Sprint" value={1} comparedValue={3} />
            <div className="bg-secondary-light30 dark:bg-background-light03 rounded-2xl row-span-2 md:col-span-2 flex justify-center items-center p-5">
                <div className='w-full h-full'>
                    {chartData ? <Doughnut data={chartData} options={chartOptions} /> : null}
                </div>
            </div>
            <div className="bg-secondary-light30 dark:bg-background-light03 rounded-2xl md:col-span-2 row-span-2">
                <h2>Recent Activity</h2>
            </div>
            <div className="bg-secondary-light30 dark:bg-background-light03 md:col-span-2 rounded-2xl">
                <h2>Top Performers</h2>
                <ul className='flex flex-col gap-2 justify-center items-center py-2'>
                    <li className='flex flex-row items-center gap-7'>
                        <img src={user_icon} alt="user icon" className="w-12 h-auto dark:invert" />
                        <span>User 1</span>
                        <button className='rounded-2xl bg-primary-light dark:bg-primary-dark p-3'>Send Thanks</button>
                    </li>
                    <li className='flex flex-row items-center gap-7'>
                        <img src={user_icon} alt="user icon" className="w-12 h-auto dark:invert" />
                        <span>User 2</span>
                        <button className='rounded-2xl bg-primary-light dark:bg-primary-dark p-3'>Send Thanks</button>
                    </li>
                    <li className='flex flex-row items-center gap-7'>
                        <img src={user_icon} alt="user icon" className="w-12 h-auto dark:invert" />
                        <span>User 3</span>
                        <button className='rounded-2xl bg-primary-light dark:bg-primary-dark p-3'>Send Thanks</button>
                    </li>
                </ul>
            </div>
            <div className="bg-secondary-light30 dark:bg-background-light03 col-span-1 md:col-span-2 rounded-2xl">
                <h2>Recent Tickets</h2>
            </div>
        </div>
    )
}