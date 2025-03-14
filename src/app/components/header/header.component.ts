import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isLoggedIn = false; // Add property to track login state

  // Navigation items array
  navItems = [
    { id: 'home', label: 'Home', link: '#' },
    { id: 'about', label: 'About', link: '#about' },
    { id: 'services', label: 'Services', link: '#services' },
    { id: 'book', label: 'Book Now', link: '#book' },
    { id: 'contact', label: 'Contact', link: '#contact' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Check scroll position on page load
    this.checkScroll();

    // Optional: Check if user is logged in
    // this.checkLoginStatus();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Get the height of the hero section
    // You might need to adjust this selector to match your hero element
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    if (!heroSection) return;


    // Determine when to change header style (when scrolled past hero)
    const heroHeight = heroSection.offsetHeight - 100; // Subtract header height

    // Update isScrolled state based on scroll position
    this.isScrolled = window.pageYOffset > heroHeight;
  }

  // Optional: Method to handle login
  login() {
    // Your authentication logic here
    console.log('Login clicked');
  }

  // Optional: Method to handle logout
  logout() {
    // Your logout logic here
    console.log('Logout clicked');
    this.isLoggedIn = false;
  }

  // Optional: Method to check login status
  checkLoginStatus() {
    // Check if user is logged in (from localStorage, session, or auth service)
    // For example:
    // this.isLoggedIn = !!localStorage.getItem('auth_token');
  }
}