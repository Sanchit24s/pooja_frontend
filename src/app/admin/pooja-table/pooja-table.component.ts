import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

interface Appointment {
  _id: string;
  name: string;
  address: string;
  poojaDate: string;
  poojaType?: string;
  email: string;
  phoneNumber: string;
  samagriOption: string;
  bookingDate: string;
  query: string;
}

@Component({
  selector: 'app-pooja-table',
  templateUrl: './pooja-table.component.html',
  styleUrls: ['./pooja-table.component.css'],
})
export class PoojaTableComponent implements OnInit {
  appointments: Appointment[] = [];
  currentPage = 1;
  totalPages = 0;
  totalAppointments = 0;
  pageSize = 10;
  sortField = 'bookingDate';
  sortDirection = 'desc';
  loading = false;

  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getPooja(
      this.currentPage,
      this.pageSize,
      this.sortField,
      this.sortDirection
    ).subscribe(
      {
        next: (response: any) => {
          if (response.success) {
            this.appointments = response.data.appointments;
            this.currentPage = response.data.currentPage;
            this.totalPages = response.data.totalPages;
            this.totalAppointments = response.data.totalAppointments;
          }
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error('Error fetching appointments');
          this.loading = false;
        }
      }
    );
  }

  onPageChange(page: number): void {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAppointments();
    }
  }

  onSortChange(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadAppointments();
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page when changing page size
    this.loadAppointments();
  }

  // Enhanced pagination with ellipsis for many pages
  getPagesToShow(): (number | string)[] {
    const pagesToShow: (number | string)[] = [];

    if (this.totalPages <= 7) {
      // If few pages, show all page numbers
      for (let i = 1; i <= this.totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      // Always include first page
      pagesToShow.push(1);

      // Add ellipsis if needed
      if (this.currentPage > 3) {
        pagesToShow.push('...');
      }

      // Determine range of pages around current page
      let startPage = Math.max(2, this.currentPage - 1);
      let endPage = Math.min(this.totalPages - 1, this.currentPage + 1);

      // Adjust range to always show 3 pages when possible
      if (startPage === 2 && this.totalPages > 5) {
        endPage = Math.min(4, this.totalPages - 1);
      }
      if (endPage === this.totalPages - 1 && this.totalPages > 5) {
        startPage = Math.max(2, this.totalPages - 3);
      }

      // Add the range of pages
      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }

      // Add ellipsis if needed
      if (this.currentPage < this.totalPages - 2) {
        pagesToShow.push('...');
      }

      // Always include last page
      pagesToShow.push(this.totalPages);
    }

    return pagesToShow;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

}