import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(user: {}) {
    const loginUrl: string = '/login';
    /*
    Login the user with a call to loginUrl at our API and return the JWT.
    */
    return this.http.post(loginUrl, user)
      .map((response: Response) => {
        const token = this.getTokenFromResponse(response);
        return token;
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
    Signup a new user with a call to signupUrl at our API and return the JWT.
    */
    return this.http.post(signupUrl, user)
      .map((response: Response) => {
        const token = this.getTokenFromResponse(response);
        return token;
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

  getUserId() {
    const tokenObject = JSON.parse(window.atob(this.getToken().split('.')[1]));
    return tokenObject._id;
  }

  isLoggedIn() {
    return this.getToken() ? true : false;
  }

  private getTokenFromResponse(response: Response) {
    const headers = response.headers.toJSON();
    return headers['x-auth'] ? headers['x-auth'][0] : headers['X-Auth'][0];
  }
}
