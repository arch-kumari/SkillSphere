import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { AuthService } from './service/login.service';
import { Router , NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'skill-sphere-application';
  googleAuthUrl = environment.hostUrl + "/auth/google";
  welcomepage = '';
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update the login state when navigation ends
        this.authService.updateLoginState();
      });
  }

  loginAsStudent() {
    this.authService.login('student');
  }

  loginAsInstructor() {
    this.authService.login('instructor');
    window.location.href = this.googleAuthUrl; 
  }

  logout() {
    this.authService.logout();
    window.location.href = this.welcomepage; 
  }


}
