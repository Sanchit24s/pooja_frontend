import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private isAuthenticated = false;
  private authSecretKey = 'Auth Token';

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.authSecretKey, response.token);
          this.isAuthenticated = true;
        }
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

}
