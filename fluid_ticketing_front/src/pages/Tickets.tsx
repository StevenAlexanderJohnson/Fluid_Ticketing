import { useEffect, useState } from 'react';
import type { ticket } from '../components/ticket_preview.tsx'
import TicketPreview from '../components/ticket_preview.tsx';
import { useSelector } from 'react-redux';

interface asignee_option {
    id: number,
    name: string
}
export default function Tickets() {
    const [statusFilter, setStatusFilter] = useState('open');
    const [typeFilter, setTypeFilter] = useState('bug');
    const [asigneeOptions, setAssigneeOptions] = useState<asignee_option[]>([])
    const [assigneeFilter, setAssigneeFilter] = useState('all');
    const [descriptionFilter, setDescriptionFilter] = useState('');
    const [tickets, setTickets] = useState<ticket[]>([])

    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        const tickets: ticket[] = [
            {
                id: 1,
                title: 'Ticket 1',
                assignee_id: 1,
                assignee_name: 'John Doe',
                type: 'bug',
                status: 'open',
                priority: 'low',
                description: 'This is a ticket',
                created_at: '2021-10-01',
                updated_at: '2021-10-01'
            },
            {
                id: 2,
                title: 'Ticket 2',
                assignee_id: 2,
                assignee_name: 'Jane Doe',
                type: 'bug',
                status: 'open',
                priority: 'low',
                description: 'This is a ticket',
                created_at: '2021-10-01',
                updated_at: '2021-10-01'
            }
        ] as ticket[];

        setTickets(tickets);

        const asigneeOptions = tickets
            .filter((x) => x.assignee_id !== null)
            .map((ticket) => { return { id: ticket.assignee_id!, name: ticket.assignee_name! } satisfies asignee_option });
        setAssigneeOptions(asigneeOptions);
    }, []);

    return (
        <div className='flex flex-col overflow-x-auto p-3'>
            <div className='flex flex-row justify-center items-center gap-3 pb-5 flex-wrap'>
                <label htmlFor="status_filter" className='text-2xl'>
                    Status:
                    <select name="status_filter" className='bg-secondary-light dark:bg-secondary-dark text-base rounded-2xl p-3 mx-2' onChange={(e) => setStatusFilter(e.target.value)}>
                        <option>Open</option>
                        <option>Closed</option>
                        <option>In Progress</option>
                        <option>All</option>
                    </select>
                </label>
                <label htmlFor='type_filter' className='text-2xl'>
                    Type:
                    <select name="type_filter" className='bg-secondary-light dark:bg-secondary-dark text-base rounded-2xl p-3 mx-2' onChange={(e) => setTypeFilter(e.target.value)}>
                        <option>Bug</option>
                        <option>Feature</option>
                        <option>Task</option>
                        <option>Epic</option>
                        <option>Story</option>
                    </select>
                </label>
                <label htmlFor='assignee_filter' className='text-2xl'>
                    Assignee:
                    <select defaultValue={`${user}`} name="assignee_filter" className='bg-secondary-light dark:bg-secondary-dark text-base rounded-2xl p-3 mx-2' onChange={(e) => setAssigneeFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value={`${user}`}>Me</option>
                        {asigneeOptions.map((option) => <option key={option.id}>{option.name}</option>)}
                    </select>
                </label>
                <input type="text" className='bg-secondary-light dark:bg-secondary-dark text-base rounded-2xl p-3 mx-2 flex-grow' placeholder='Search Descriptions' onChange={(e) => setDescriptionFilter(e.target.value)} />
            </div>
            <div className="flex-grow flex flex-col gap-10 border-accent-light dark:border-accent-dark border-2 rounded-2xl p-10">
                {tickets
                    .filter((x) => {
                        if (statusFilter === 'all') {
                            return true;
                        }
                        return x.status.toLowerCase() === statusFilter.toLowerCase()
                            && x.type.toLowerCase() === typeFilter.toLowerCase()
                            && (assigneeFilter === 'all' || x.assignee_name.toLowerCase() === assigneeFilter.toLowerCase())
                            && x.description.toLowerCase().includes(descriptionFilter.toLowerCase());
                    })
                    .map((ticket) => <TicketPreview key={ticket.id} {...ticket} />)}
            </div>
        </div>
    )
}