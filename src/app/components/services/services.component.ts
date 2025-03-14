import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

interface Category {
  name: string;
  image: string;
  route: string;
}

interface Pooja {
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {
  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  activeFeatureIndex = 0;
  activeCategoryIndex = 0;

  featuredPoojas: Pooja[] = [
    {
      name: 'Satyanarayan Puja',
      image: '/assets/images/satyanarayan-puja.jpg',
      description: 'Satyanarayan Puja is performed to remove all obstacles and negative energies, bringing victory and success. It helps acquire wealth and prosperity while bringing harmony to the family and success in life.'
    },
    {
      name: 'Vivah (Marriage)',
      image: '/assets/images/vivah-ceremony.jpg',
      description: 'Vivah Puja is a divine and sacred union where the bride and groom transition from Brahmacharyashram to Grihasthashramam. This ceremony invokes the blessings of deities, ancestors, and the cosmos for a prosperous, harmonious, and fulfilling marital life.'
    },
    {
      name: 'Vastu Shanti Puja',
      image: '/assets/images/vastu-shanti.jpg',
      description: 'Vastu Shanti Puja is a powerful Vedic ritual performed to remove Vastu Dosh and invoke divine blessings for peace and prosperity. It is dedicated to Vastu Purush, the protector of buildings and land, along with the five elements of nature.'
    },
    {
      name: 'Bhoomi Puja',
      image: '/assets/images/bhoomi-puja.jpg',
      description: 'Bhoomi Puja is a spiritual ritual performed before construction to honor Mother Earth, Vastu Purush, and the deities of directions. It removes negative influences, pacifies Vastu Dosh, and ensures a smooth construction process.'
    },
    {
      name: 'Ganesh Puja',
      image: '/assets/images/ganesh-puja.jpg',
      description: 'Ganesh Puja invokes the blessings of Lord Ganapathi, the remover of obstacles and provider of wisdom, prosperity, and harmony. It is considered essential before any auspicious event to ensure success and remove hurdles.'
    },
    {
      name: 'Shuddhikaran Puja',
      image: '/assets/images/shuddhikaran-puja.jpg',
      description: 'Shuddhikaran Puja is a purification ritual performed after specific life events to cleanse the home, family members, and surroundings from negative influences. It restores positivity and prepares the home for auspicious occasions.'
    }
  ];

  categories: Category[] = [
    {
      name: 'Shanti Pujas',
      image: '/assets/images/shanti-pujas.jpg',
      route: '/poojas/shanti'
    },
    {
      name: 'Havans',
      image: '/assets/images/havans.jpg',
      route: '/poojas/havans'
    },
    {
      name: "Paths",
      image: '/assets/images/paths.jpg',
      route: '/poojas/paths'
    },
    {
      name: "Festivals",
      image: '/assets/images/festivals.jpg',
      route: '/poojas/festivals'
    },
    {
      name: "Jaaps",
      image: '/assets/images/jaaps.jpg',
      route: '/poojas/jaaps'
    },
    {
      name: "Divine Consultancy",
      image: '/assets/images/divine.jpg',
      route: '/poojas/divine'
    },
    {
      name: "Others",
      image: '/assets/images/other.jpg',
      route: '/poojas/others'
    },
  ];

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.setupScrollListeners();
  }

  setupScrollListeners() {
    this.scrollContainers.forEach((containerRef, containerIndex) => {
      const container = containerRef.nativeElement;

      // Use Intersection Observer to detect visible items
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemWidth = entry.target.clientWidth;
            const scrollPosition = container.scrollLeft;
            const index = Math.round(scrollPosition / itemWidth);

            if (containerIndex === 0) {
              this.activeFeatureIndex = Math.floor(index / 3);
            } else {
              this.activeCategoryIndex = Math.floor(index / 3);
            }
          }
        });
      }, { threshold: 0.6 });

      // Observe each child element
      Array.from(container.children).forEach(child => {
        observer.observe(child as Element);
      });
    });
  }

  scrollTo(containerIndex: number, index: number) {
    const container = this.scrollContainers.get(containerIndex)?.nativeElement;
    if (container) {
      const itemWidth = container.children[0].clientWidth;
      container.scrollTo({
        left: index * itemWidth * 3,
        behavior: 'smooth'
      });

      if (containerIndex === 0) {
        this.activeFeatureIndex = index;
      } else {
        this.activeCategoryIndex = index;
      }
    }
  }

  navigateToCategory(route: string) {
    this.router.navigate([route]);
  }
}