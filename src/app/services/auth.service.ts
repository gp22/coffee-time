import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(user: {}) {
    const loginUrl: string = '/login';
    /*
    Login the current user with a call to loginUrl at our API.
    */
    return this.http.post(loginUrl, user)
      .map((response: Response) => {
        return response.headers.toJSON()['x-auth'][0];
      })
      .catch((error: Response) => {
        /*
        If there's a problem, throw a new error and handle it in
        the calling function.
        */
        return Observable.throw(error);
      });
  }

  signup(user) {
    const signupUrl: string = '/users';
    /*
    Signup a new user with a call to signupUrl at our API.
    */
    return this.http.post(signupUrl, user)
      .map((response: Response) => {
        return response.headers.toJSON()['x-auth'][0];
      })
      .catch((error: Response) => {
        /*
        If there's a problem, throw a new error and handle it in
        the calling function.
        */
        return Observable.throw(error);
      });
  }

  logout() {
    window.localStorage.removeItem('coffeeTimeToken');
  }

  setToken(token: string) {
    window.localStorage.coffeeTimeToken = token;
  }

  getToken() {
    return window.localStorage.coffeeTimeToken;
  }

  isLoggedIn() {
    return this.getToken() ? true : false;
  }
}
