export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Checked-in' | 'Completed' | 'No-show' | 'Cancelled';

export interface Appointment {
    id: string;
    clientId: string;
    staffId: string;
    serviceId: string;
    date: Date;
    startTime: string; // e.g. "10:00"
    endTime: string;   // e.g. "11:00"
    status: AppointmentStatus;
    notes?: string;
}
