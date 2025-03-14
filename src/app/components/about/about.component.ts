import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lazyImage1') lazyImage1!: ElementRef;
  @ViewChild('lazyImage2') lazyImage2!: ElementRef;
  @ViewChild('lazyImage3') lazyImage3!: ElementRef;

  isVisible1 = false;
  isVisible2 = false;
  isVisible3 = false;

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    // Clean up observer when component is destroyed
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, // Use viewport
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly before elements come into view
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check which element was intersected and update its visibility
          if (entry.target === this.lazyImage1.nativeElement) {
            setTimeout(() => this.isVisible1 = true, 100);
          } else if (entry.target === this.lazyImage2.nativeElement) {
            setTimeout(() => this.isVisible2 = true, 100);
          } else if (entry.target === this.lazyImage3.nativeElement) {
            setTimeout(() => this.isVisible3 = true, 100);
          }

          // Once visible, no need to keep observing
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all three image containers
    this.observer.observe(this.lazyImage1.nativeElement);
    this.observer.observe(this.lazyImage2.nativeElement);
    this.observer.observe(this.lazyImage3.nativeElement);
  }
}
