import { CoffeeShop } from '../shared/coffee-shop.model';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class EventService {
  constructor(private http: Http,
              private authService: AuthService) {}

  addUserToEvent(coffeeShop: CoffeeShop) {
    // Event route requires a token in the x-auth header of the post request.
    const headers = new Headers({ 'x-auth': this.authService.getToken() })
    const eventId = coffeeShop.id;
    const userId = this.authService.getUserId();
    const eventUrl: string = `/${eventId}/${userId}`;

    /*
    Add the current user to the event with a call to eventUrl at our API.
    */
    return this.http.post(eventUrl, '', { headers: headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        /*
        If there's a problem, throw a new error and handle it in
        the calling function.
        */
        return Observable.throw(error);
      });
  }
}
