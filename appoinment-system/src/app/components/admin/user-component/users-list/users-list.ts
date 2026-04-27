import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

import { User, UserRole } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    TagModule
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList implements OnInit {
  users: User[] = [];



  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  openNew() {
    this.router.navigate(['/dashboard/users/new']);
  }

  editUser(user: User) {
    this.router.navigate(['/dashboard/users/edit', user.id]);
  }

  viewUser(user: User) {
    this.router.navigate(['/dashboard/users/view', user.id]);
  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete ' + user.name + '?')) {
      this.userService.deleteUser(user.id);
    }
  }

  getRoleSeverity(role: string): "success" | "info" | "warn" | "danger" | "secondary" | "contrast" {
    switch (role) {
      case 'Admin': return 'danger';
      case 'Staff': return 'info';
      case 'Client': return 'success';
      default: return 'secondary';
    }
  }
}
