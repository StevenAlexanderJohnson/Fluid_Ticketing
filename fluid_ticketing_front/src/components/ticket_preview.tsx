export interface ticket {
    id: number,
    title: string,
    assignee_id: number | null,
    assignee_name: string | 'Unassigned',
    type: 'bug' | 'feature' | 'task' | 'epic' | 'story',
    status: 'open' | 'in progress' | 'closed',
    priority: 'low' | 'medium' | 'high',
    description: string,
    created_at: string,
    updated_at: string,
}

export default function TicketPreview(prop: ticket) {
    return (
        <a href={`/tickets/${prop.id}`} className="bg-primary-light dark:bg-primary-dark rounded-2xl text-text-light">
            <h2 className="text-2xl">{prop.title}</h2>
            <p className="text-sm">{prop.description}</p>
            <p className="text-sm">{prop.type}</p>
            <p className="text-sm">{prop.status}</p>
        </a>
    );
}