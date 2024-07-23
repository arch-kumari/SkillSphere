import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userTypeSubject = new BehaviorSubject<string | null>(this.getUserType());

  loggedIn$ = this.loggedInSubject.asObservable();
  userType$ = this.userTypeSubject.asObservable();

  login(userType: string) {
    // Perform login logic here
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userType', userType);
    this.loggedInSubject.next(true);
    this.userTypeSubject.next(userType);
  }

  logout() {
    // Perform logout logic here
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userType');
    this.loggedInSubject.next(false);
    this.userTypeSubject.next(null);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  public getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  public updateLoginState() {
    this.loggedInSubject.next(this.isLoggedIn());
    this.userTypeSubject.next(this.getUserType());
  }
}