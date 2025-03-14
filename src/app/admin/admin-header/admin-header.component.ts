import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  isMenuOpen: boolean = false;
  isMobileSearchOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  user = {
    name: "Admin User",
    avatar: "assets/images/avatar.png"
  };

  constructor(private authService: AuthService) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    const userMenuBtn = document.getElementById('userMenuButton');
    const userMenu = event.target.closest('.user-profile .relative');
    if (!userMenu && this.isMenuOpen && userMenuBtn !== event.target) {
      this.isMenuOpen = false;
    }

    // Close mobile search if clicked outside
    const searchButton = event.target.closest('[aria-label="Search"]');
    const searchBox = event.target.closest('.mobile-search');
    if (!searchButton && !searchBox && this.isMobileSearchOpen) {
      this.isMobileSearchOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMobileSearch(): void {
    this.isMobileSearchOpen = !this.isMobileSearchOpen;
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}