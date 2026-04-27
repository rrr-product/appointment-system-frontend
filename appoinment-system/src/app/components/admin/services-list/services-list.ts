import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TableModule, ButtonModule, 
    DialogModule, TagModule
  ],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss'
})
export class ServicesList implements OnInit {
  services: Service[] = [];
  


  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceService.getServices().subscribe(data => this.services = data);
  }

  openNew() {
    this.router.navigate(['/dashboard/services/new']);
  }

  editService(service: Service) {
    this.router.navigate(['/dashboard/services/edit', service.id]);
  }

  viewService(service: Service) {
    this.router.navigate(['/dashboard/services/view', service.id]);
  }

  deleteService(service: Service) {
    if (confirm('Are you sure you want to delete ' + service.name + '?')) {
      this.serviceService.deleteService(service.id);
    }
  }
}
