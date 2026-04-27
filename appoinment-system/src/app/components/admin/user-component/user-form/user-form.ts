import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, 
    InputTextModule, SelectModule, CheckboxModule, FloatLabelModule,
    BreadcrumbModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {
  user: User = this.getEmptyUser();
  submitted: boolean = false;
  isEditMode: boolean = false;
  
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Staff', value: 'Staff' },
    { label: 'Client', value: 'Client' }
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditMode = !!id;

      this.items = [
        { label: 'Users', routerLink: '/dashboard/users' },
        { label: this.isEditMode ? 'Edit User' : 'New User' }
      ];

      if (id) {
        this.isEditMode = true;
        const existingUser = this.userService.getUserById(id);
        if (existingUser) {
          this.user = { ...existingUser };
        } else {
          // User not found
          this.router.navigate(['/dashboard/users']);
        }
      }
    });
  }

  getEmptyUser(): User {
    return {
      id: '',
      name: '',
      email: '',
      role: 'Client',
      phone: '',
      isActive: true
    };
  }

  cancel() {
    this.router.navigate(['/dashboard/users']);
  }

  save() {
    this.submitted = true;

    if (this.user.name?.trim() && this.user.email?.trim()) {
      if (this.isEditMode) {
        this.userService.updateUser(this.user);
      } else {
        this.userService.addUser(this.user);
      }
      this.router.navigate(['/dashboard/users']);
    }
  }
}
