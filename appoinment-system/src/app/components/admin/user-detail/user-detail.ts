import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TagModule, AvatarModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user = this.userService.getUserById(id);
      if (!this.user) {
        this.router.navigate(['/dashboard/users']);
      }
    }
  }

  editUser() {
    if (this.user) {
      this.router.navigate(['/dashboard/users/edit', this.user.id]);
    }
  }

  deleteUser() {
    if (this.user && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(this.user.id);
      this.router.navigate(['/dashboard/users']);
    }
  }

  getRoleSeverity(role: string): "info" | "success" | "warn" | "secondary" {
    switch (role) {
      case 'Admin': return 'warn';
      case 'Staff': return 'info';
      default: return 'success';
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/users']);
  }
}
