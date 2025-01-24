import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default is logged out
  private email = new BehaviorSubject<string | null>(null);

  // Observable for components to subscribe to
  isLoggedIn = this.loggedIn.asObservable();
  email$ = this.email.asObservable();

  login(email: string): void {
    this.loggedIn.next(true);
    this.email.next(email);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
  }

  logout(): void {
    this.loggedIn.next(false);
    this.email.next(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
  }

  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('email');
    this.loggedIn.next(isLoggedIn);
    this.email.next(email);
  }
}
