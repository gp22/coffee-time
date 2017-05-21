import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QueryService } from '../services/query.service';
import { DataService } from '../services/data.service';
import { CoffeeShop } from '../shared/coffee-shop.model';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css'],
  providers: [QueryService]
})
export class QueryFormComponent {

  onSubmit(queryForm: NgForm) {
    const city: string = queryForm.value.queryCity;
    this.queryService.getCoffeeShops(city)
      .then(response => {
        // Clear out existing coffee shops if there are any.
        if (this.dataService.coffeeShops.length !== 0) {
          this.dataService.clear();
        }
        // Build up our list of coffee shops.
        response.businesses.forEach(coffeeShop => {
          this.dataService.coffeeShops.push(
            new CoffeeShop(coffeeShop)
          );
        })
      })
      .catch(e => {
        // If there's a problem, we log it to the console.
        console.log('There was a problem getting Yelp data: ' + e);
      });
  }

  constructor(private queryService: QueryService,
              private dataService: DataService) {}
}