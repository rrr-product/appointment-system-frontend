import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    Toolbar
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout { }
