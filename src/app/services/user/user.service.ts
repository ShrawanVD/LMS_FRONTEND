import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userData : any = {};

  login(data: any) {
    return this.http
      .post('https://lms-backend-1-deyq.onrender.com/api/payment/login', data)
      .subscribe((result: any) => {
        localStorage.setItem('token', result.token);
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/dashboard']);
      });
  }

  profile() {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http
      .post(
        'https://lms-backend-1-deyq.onrender.com/api/payment/profile',
        {},
        { headers }
      )
      .subscribe((result: any) => {
        if (result && result.authData) {
          this.userData = result.authData;
          localStorage.setItem('authData', JSON.stringify(this.userData)); // Store authData in localStorage
        } else {
          // If no authData is returned, keep the existing data in localStorage
          const storedAuthData = localStorage.getItem('authData');
          if (storedAuthData) {
            this.userData = JSON.parse(storedAuthData);
          }
        }
      }, (error: any) => {
        // On error, attempt to get authData from localStorage
        const storedAuthData = localStorage.getItem('authData');
        if (storedAuthData) {
          this.userData = JSON.parse(storedAuthData);
        }
      });
  }

  getAuthData() {
    const authData = localStorage.getItem('authData');
    if (authData) {
      this.userData = JSON.parse(authData);
    } else {
      // Handle case where authData is not found
      console.log('No authData found in localStorage');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
