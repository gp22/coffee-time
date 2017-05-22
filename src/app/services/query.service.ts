import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class QueryService {
  constructor(private http: Http) {}

  getCoffeeShops(city) {
    const queryUrl: string = `/api/${city}`;
    /*
    getCoffeeShops will GET and return the list of coffe shops in city
    from our API.
    */
    return this.http.get(queryUrl)
      .toPromise()
      .then(response => { return response.json() })
      .catch(e => {
        /*
        If there's a problem, throw a new error and catch it in
        the query-form component.
        */
        throw new Error(e);
      });
  }
}
