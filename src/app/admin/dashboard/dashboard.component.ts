import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Statistics
  totalBookings!: number;
  currentMonthBookings!: number;
  bookingGrowth: number = 12.4;
  avgBookingValue: number = 149.99;

  // Chart
  bookingsChart: any;
  timeRange: string = 'sixMonths';

  // Bookings data for chart
  yearData: any[] = [];

  sixMonthsData: any[] = [];

  // Empty array to be populated with your actual booking data
  recentBookings: any[] = [];
  isLoading: boolean = true;

  constructor(private appointmentService: AppointmentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    // Initialize chart after view is ready
    setTimeout(() => {
      this.createChart();
    }, 0);
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Get counts
    this.getCount();

    // Load graph data
    this.loadGraphData();

    // Load recent bookings data
    this.loadRecentBookings();
  }

  getCount() {
    this.appointmentService.getCount().subscribe({
      next: (response: any) => {
        this.totalBookings = response.totalCount;
        this.currentMonthBookings = response.currentMonthCount;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error in fetching count");
        console.log('Error fetching count:', error);
        this.isLoading = false;
      }
    });
  }

  createChart(): void {
    const data = this.timeRange === 'year' ? this.yearData : this.sixMonthsData;

    if (this.bookingsChart) {
      this.bookingsChart.destroy();
    }

    const ctx = document.getElementById('bookingsChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Chart canvas element not found');
      return;
    }

    this.bookingsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.month),
        datasets: [{
          label: 'Monthly Bookings',
          data: data.map(item => item.bookings),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 30,
          maxBarThickness: 50
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              precision: 0
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: function (context: any) {
                return `Bookings: ${context.raw}`;
              }
            }
          }
        }
      }
    });
  }

  changeTimeRange(range: string): void {
    this.timeRange = range;
    this.loadGraphData();
  }

  loadGraphData(): void {
    // Get chart data from API
    this.appointmentService.getChartData(this.timeRange).subscribe({
      next: (response: any) => {
        // The API now returns the formatted data directly
        // We just need to store it in the right variable based on timeRange
        if (this.timeRange === 'year') {
          this.yearData = response.formattedData;
        } else {
          this.sixMonthsData = response.formattedData;
        }

        // Create the chart with the new data
        this.createChart();
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error loading chart data");
        console.error('Error fetching chart data:', error);
        this.isLoading = false;
      }
    });
  }

  loadRecentBookings(): void {
    this.appointmentService.getRecentBookings().subscribe({
      next: (response: any) => {
        this.recentBookings = response.formattedBookings;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error loading recent bookings");
        console.log(error);
        this.isLoading = false;
      }
    });

  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}