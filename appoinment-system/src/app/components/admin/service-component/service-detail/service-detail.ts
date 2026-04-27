import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Service } from '../../../../models/service.model';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TagModule],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss'
})
export class ServiceDetail implements OnInit {
  service: Service | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service = this.serviceService.getServiceById(id);
      if (!this.service) {
        this.router.navigate(['/dashboard/services']);
      }
    }
  }

  editService() {
    if (this.service) {
      this.router.navigate(['/dashboard/services/edit', this.service.id]);
    }
  }

  deleteService() {
    // Add delete logic here
    if (this.service && confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(this.service.id);
      this.router.navigate(['/dashboard/services']);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/services']);
  }
}
