import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  // Mock data
  private mockServices: Service[] = [
    { id: '1', name: 'General Consultation', description: 'Standard checkup', durationMinutes: 30, price: 50, isActive: true },
    { id: '2', name: 'Specialist Visit', description: 'Advanced diagnostics', durationMinutes: 60, price: 150, isActive: true },
    { id: '3', name: 'Follow-up', description: 'Quick follow up', durationMinutes: 15, price: 30, isActive: false }
  ];

  private servicesSubject = new BehaviorSubject<Service[]>(this.mockServices);

  constructor() { }

  getServices(): Observable<Service[]> {
    return this.servicesSubject.asObservable();
  }

  getServiceById(id: string): Service | undefined {
    return this.mockServices.find(s => s.id === id);
  }

  addService(service: Omit<Service, 'id'>) {
    const newService = { ...service, id: Math.random().toString(36).substring(2, 9) };
    this.mockServices = [...this.mockServices, newService];
    this.servicesSubject.next(this.mockServices);
  }

  updateService(service: Service) {
    this.mockServices = this.mockServices.map(s => s.id === service.id ? service : s);
    this.servicesSubject.next(this.mockServices);
  }

  deleteService(id: string) {
    this.mockServices = this.mockServices.filter(s => s.id !== id);
    this.servicesSubject.next(this.mockServices);
  }
}
