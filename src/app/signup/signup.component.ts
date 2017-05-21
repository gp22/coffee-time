import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  
  // Eventually this will be a new instance of the user model.
  // newUser: User = new User();
  newUser = {};

  loginError: boolean = false;

  onSubmit() {
    this.authService.login(this.newUser)
      .subscribe(
        (response) => {
          const token: string = response;
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(`There was a problem signing up: ${error}`);
          this.loginError = true;
        });
  }
}
