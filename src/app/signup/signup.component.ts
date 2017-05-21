import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class SignupComponent implements OnInit {
  // Eventually this will be a new instance of the user model.
  // newUser: User = new User();
  newUser = {};

  onSubmit(signUpForm: NgForm) {
    console.log(this.newUser);
  }
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
