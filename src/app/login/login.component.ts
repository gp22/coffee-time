import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  onSubmit(form: NgForm) {
    console.log(form);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
