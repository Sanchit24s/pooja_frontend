import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Optional: Close sidebar when route changes on mobile
  onRouteChange(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }
}
