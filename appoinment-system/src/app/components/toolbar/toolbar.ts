import { Component, OnInit } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  imports: [ToolbarModule, ButtonModule, AvatarModule, MenuModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        items: [
          { label: 'Statistics', icon: 'pi pi-chart-bar', routerLink: 'stats' }
        ]
      },
      {
        label: 'Administration',
        items: [
          { label: 'Services', icon: 'pi pi-briefcase', routerLink: 'services' },
          { label: 'Users', icon: 'pi pi-users', routerLink: 'users' }
        ]
      }
    ];
  }

  toggleSidebar() {

  }
}
