interface LightDashboardCellProps {
    title: string;
    value: number;
    comparedValue?: number;
    icon?: string;
    iconAlt?: string;
    colSpan?: number;
    rowSpan?: number;
}

export default function LightDashboardCell(props: LightDashboardCellProps) {
    if (props.icon && !props.iconAlt) {
        console.warn('LightDashboardCell: iconAlt is not defined');
    }

    return (
        <div className="bg-secondary-light30 dark:bg-secondary-dark30 rounded-2xl flex flex-col gap-3 justify-around items-center">
            <h2 className='text-lg'>{props.title}</h2>
            <p className='text-4xl flex flex-row gap-2'>
                {props.icon ? <img src={props.icon} alt={props.iconAlt} className="w-10 h-auto dark:invert" /> : null}
                {props.value}
            </p>
            {props.comparedValue && <div>
                <p className="text-sm text-gray-500">Compared to last sprint</p>
                {
                    props.comparedValue > props.value ?
                        <p className="text-sm text-green-500">+{props.comparedValue - props.value}</p> :
                        props.comparedValue == props.value ? <p className="text-sm text-gray-500">0</p> :
                            <p className="text-sm text-red-500">-{props.value - props.comparedValue}</p>
                }
            </div>}
        </div>
    );
}