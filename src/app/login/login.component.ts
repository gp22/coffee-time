import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {
  // Eventually this will be a new instance of the user model.
  // user: User = new User();
  user = {};

  onSubmit() {
    this.authService.login(this.user)
      .subscribe(
        (response) => {
          const token: string = response;
          this.authService.setToken(token);
        },
        (error) => console.error(`There was a problem logging in: ${error}`)
      );
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
