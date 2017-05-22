import { fadeInAnimation } from '../animations/fade-in.animation';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class SignupComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  private newUser: {} = {};

  loginError: boolean = false;

  onSubmit() {
    this.authService.signup(this.newUser)
      .subscribe(
        (response) => {
          const token: string = response;
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(`There was a problem signing up: ${error}`);
          this.loginError = true;
        }
      );
  }
}
