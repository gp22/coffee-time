import { fadeInAnimation } from '../animations/fade-in.animation';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  private user: {} = {};
  private loginError: boolean = false;

  /*
  When the login form is submitted, we send the request to the API. If we get
  back a token, we set it and redirect to the home page. Otherwise we handle
  the error and display a message to the user.
  */
  onSubmit() {
    this.authService.login(this.user)
      .subscribe(
        (response) => {
          const token: string = response;
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(`There was a problem logging in: ${error}`);
          this.loginError = true;
        }
      );
  }
}
