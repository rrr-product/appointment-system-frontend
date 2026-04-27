import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mock data
  private mockUsers: User[] = [
    { id: '1', name: 'Admin Alice', email: 'alice@clinic.com', role: 'Admin', phone: '123-456-7890', isActive: true },
    { id: '2', name: 'Dr. Bob', email: 'bob@clinic.com', role: 'Staff', phone: '987-654-3210', isActive: true },
    { id: '3', name: 'Charlie Client', email: 'charlie@gmail.com', role: 'Client', isActive: true }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.mockUsers);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUserById(id: string): User | undefined {
    return this.mockUsers.find(u => u.id === id);
  }

  addUser(user: Omit<User, 'id'>) {
    const newUser = { ...user, id: Math.random().toString(36).substring(2, 9) };
    this.mockUsers = [...this.mockUsers, newUser];
    this.usersSubject.next(this.mockUsers);
  }

  updateUser(user: User) {
    this.mockUsers = this.mockUsers.map(u => u.id === user.id ? user : u);
    this.usersSubject.next(this.mockUsers);
  }

  deleteUser(id: string) {
    this.mockUsers = this.mockUsers.filter(u => u.id !== id);
    this.usersSubject.next(this.mockUsers);
  }
}
