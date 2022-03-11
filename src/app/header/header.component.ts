import {Component} from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isLoggedIn: boolean;

  constructor(private authService: AuthenticationService) {
    authService.isUserLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
    this.isLoggedIn = authService.isLoggedIn();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
