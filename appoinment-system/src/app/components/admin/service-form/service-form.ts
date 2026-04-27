import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule,
    InputTextModule, InputNumberModule, CheckboxModule, TextareaModule, FloatLabelModule,
    BreadcrumbModule
  ],
  templateUrl: './service-form.html',
  styleUrl: './service-form.scss'
})
export class ServiceForm implements OnInit {
  service: Service = this.getEmptyService();
  submitted: boolean = false;
  isEditMode: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditMode = !!id;

      this.items = [
        { label: 'Services', routerLink: '/dashboard/services' },
        { label: this.isEditMode ? 'Edit Service' : 'New Service' }
      ];

      if (id) {
        this.isEditMode = true;
        const existingService = this.serviceService.getServiceById(id);
        if (existingService) {
          this.service = { ...existingService };
        } else {
          this.router.navigate(['/dashboard/services']);
        }
      }
    });
  }

  getEmptyService(): Service {
    return {
      id: '',
      name: '',
      description: '',
      durationMinutes: 30,
      price: 0,
      isActive: true
    };
  }

  cancel() {
    this.router.navigate(['/dashboard/services']);
  }

  save() {
    this.submitted = true;

    if (this.service.name?.trim()) {
      if (this.isEditMode) {
        this.serviceService.updateService(this.service);
      } else {
        this.serviceService.addService(this.service);
      }
      this.router.navigate(['/dashboard/services']);
    }
  }
}
