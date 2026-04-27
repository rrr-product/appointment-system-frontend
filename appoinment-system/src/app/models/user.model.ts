export type UserRole = 'Admin' | 'Staff' | 'Client';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    isActive: boolean;
}
