// hero.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.8s ease-out')
      ])
    ])
  ]
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;
  isMobile = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.heroContent.nativeElement.classList.add('loaded');
    }, 100);
  }
}