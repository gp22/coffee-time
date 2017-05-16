import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class SignupComponent implements OnInit {

  onSubmit(form: NgForm) {
    console.log(form);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
