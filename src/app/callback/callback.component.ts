import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
    this.authService.handleAuthentication();
  }

  ngOnInit() {
  }

}
