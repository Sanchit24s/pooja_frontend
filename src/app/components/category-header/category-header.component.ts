import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css']
})
export class CategoryHeaderComponent {
  isScrolled = false;
  navItems = [
    { id: 'home', label: 'Home', link: '#' },
    { id: 'about', label: 'About', link: '#about' },
    { id: 'services', label: 'Services', link: '#services' },
    { id: 'book', label: 'Book Now', link: '#book' },
    { id: 'contact', label: 'Contact', link: '#contact' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
}
