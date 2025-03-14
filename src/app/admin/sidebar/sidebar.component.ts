// sidebar.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    :host {
      @media (min-width: 768px) {
        display: block;
        min-height: 100vh;
        padding-left: 16rem;
      }
    }
    
    .sidebar-container {
      position: relative;
      z-index: 40;
    }
    
    .main-content {
      transition: margin-left 0.3s;
      
      @media (min-width: 768px) {
        margin-left: 16rem;
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'fas fa-tachometer-alt', active: false },
    { label: 'Bookings', route: '/admin/appointments', icon: 'fas fa-users', active: false }
  ];

  // Added for responsiveness
  isSidebarOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Initialize sidebar state based on screen size - now using medium breakpoint (md)
    this.isSidebarOpen = window.innerWidth >= 768; // md breakpoint

    // Update active state based on current route
    this.updateActiveMenuItem(this.router.url);

    // Listen to route changes
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateActiveMenuItem(event.url);
    });
  }

  updateActiveMenuItem(currentUrl: string): void {
    this.menuItems.forEach(item => {
      item.active = currentUrl.includes(item.route);
    });
  }

  // Added for responsiveness
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Auto-close sidebar on mobile when menu item is clicked
  onMenuItemClick(): void {
    // Only auto-close on small screens (below md breakpoint)
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
  }

  // Update sidebar state when resizing window
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSidebarOpen = window.innerWidth >= 768;
  }

  logout(): void {
    this.authService.logout();
  }
}