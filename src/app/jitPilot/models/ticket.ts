import { Task } from "./task";
import { TicketPriority } from "./ticket-priority";
import { TicketStatus } from "./ticket-status";
import { UserResponse } from "./user-response";

export interface Ticket {
    ticketId: number;
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    projectId: number;
    assignedToUserId: number;
    tasks: Task[];
    users: UserResponse[];
}
