import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/api/appointment`;

  constructor(private http: HttpClient) { }

  // Function to get HTTP headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('Auth Token') || ''}`, // Include token if available
    });
  }

  bookPooja(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getCount() {
    return this.http.get(`${this.apiUrl}/count`, {
      headers: this.getHeaders(),
    });
  }

  getRecentBookings(limit: number = 5) {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/recent-bookings`, {
      headers: this.getHeaders(),
      params: params,
    });
  }

  getChartData(timeRange: string = 'sixMonths') {
    const params = new HttpParams().set('timeRange', timeRange);
    return this.http.get(`${this.apiUrl}/chart-data`, {
      headers: this.getHeaders(),
      params: params,
    });
  }

  getPooja(
    page: number = 1,
    limit: number = 10,
    sortField: string = 'bookingDate',
    sortDirection: string = 'asc'
  ) {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('limit', limit.toString())
      .append('sort', `${sortField}:${sortDirection}`);

    return this.http.get(`${this.apiUrl}`, {
      headers: this.getHeaders(),
      params,
    });
  }
}
