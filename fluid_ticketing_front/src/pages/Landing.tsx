import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import GradientText from "../components/gradient_text";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

export default function LandingPage() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Legend
    );

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Tickets over time'
            },
        },
    };

    // Create fake data that shows growth over time
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Tickets',
                data: [1, 2, 3, 4, 5, 6],
                backgroundColor: [
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                ],
                borderColor: [
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                    '#9fb734',
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    '#9fb734cc',
                    '#9fb734cc',
                    '#9fb734cc',
                    '#9fb734cc',
                    '#9fb734cc',
                    '#9fb734cc',
                ]
            },
        ]
    };

    return (
        <div className='h-full'>
            <div className="grid gap-10 md:gap-0 grid-cols-1 md:grid-cols-2 min-h-full items-center bg-gradient-to-b from-secondary-light dark:from-secondary-dark30 dark:to-background-dark to-background-light px-7 pb-7">
                <div>
                    <h1 className="text-6xl font-bold text-center">Fluid Ticketing</h1>
                    <p className="text-center text-2xl font-bold py-10">The most flexable ticketing system out there.</p>
                    <Link to='/login' className="bg-accent-light dark:bg-accent-dark text-text-light rounded-2xl p-5 text-center text-2xl font-bold">Get Started</Link>
                </div>
                    <Dashboard />
            </div>
            <div className="min-h-full grid grid-cols-1 lg:grid-cols-2 grid-rows-2 p-10 justify-center items-center gap-10">
                <p className="text-center text-2xl font-bold self-center flex-grow p-10">
                    <GradientText text={'Fluid Ticketing'} header /> is a flexable ticketing system designed to mutate to your work flow.
                </p>
                <div className="col-span-1 row-span-2 h-full flex justify-center items-center">
                    <Bar data={data} options={chartOptions} />
                </div>
                <div className="p-10">
                    <p className="text-2xl font-bold self-center">
                        Build with <GradientText text={'NoSQL'} />, the system can mutate to go wherever your needs are.
                    </p>
                    <p className="text-2xl font-bold self-center">
                        The system is designed to be as flexable as possible, allowing you to create your own tickets and track whatever metric you can think up of.
                    </p>
                </div>
            </div>
            <div className="min-h-full grid grid-cols-3 grid-rows-4 gap-10 px-10 pb-10">
                <div className="col-span-3 row-span-1 bg-secondary-light dark:bg-background-light03 rounded-2xl flex justify-center items-center p-5">
                    <GradientText text={'Price Plans'} header />
                </div>
                <div className="col-span-1 row-span-3 bg-secondary-light dark:bg-background-light03 rounded-2xl flex justify-center items-center p-5 flex-col gap-10">
                    <GradientText text={'Free'} header />
                    <ul className="flex flex-col gap-5">
                        <li>Unlimited Projects</li>
                        <li>API Access</li>
                        <li>Unlimited Users</li>
                        <li>Unlimited Tickets</li>
                    </ul>
                </div>
                <div className="col-span-1 row-span-3 bg-secondary-light dark:bg-background-light03 rounded-2xl flex justify-center items-center flex-col gap-10 p-5">
                    <GradientText text={'Double Free'} header />
                    <ul className="flex flex-col gap-5">
                        <li>Unlimited Projects</li>
                        <li>API Access</li>
                        <li>Unlimited Users</li>
                        <li>Unlimited Tickets</li>
                        <li>Priority Support</li>
                        <li>Custom Ticket Types</li>
                        <li>Custom Ticket Statuses</li>
                    </ul>
                </div>
                <div className="col-span-1 row-span-3 bg-secondary-light dark:bg-background-light03 rounded-2xl flex justify-center items-center p-5 flex-col gap-10">
                    <GradientText text={'Triple Free'} header />
                    <ul className="flex flex-col gap-5">
                        <li>Unlimited Projects</li>
                        <li>API Access</li>
                        <li>Unlimited Users</li>
                        <li>Unlimited Tickets</li>
                        <li>Priority Support</li>
                        <li>Custom Ticket Types</li>
                        <li>Custom Ticket Statuses</li>
                        <li>You can contact me at my <a href="https://stevenajohnson.codes" target='_blank'><GradientText text='website' /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}