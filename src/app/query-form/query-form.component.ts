import { Component, EventEmitter, Output } from '@angular/core';
import { QueryService } from '../services/query.service';
import { CoffeeShop } from '../shared/coffee-shop.model';
import { DataService } from '../services/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css'],
    providers: [QueryService]
})
export class QueryFormComponent {
  constructor(private queryService: QueryService,
              private dataService: DataService) {}

  @Output() isLoading = new EventEmitter<boolean>();

  onSubmit(queryForm: NgForm) {
    this.isLoading.emit(true);
    const city: string = queryForm.value.queryCity;
    this.queryService.getCoffeeShops(city)
      .then((response) => {
        this.isLoading.emit(false);
        // Clear out existing coffee shops if there are any.
        if (this.dataService.getCoffeeShopsLength() !== 0) {
          this.dataService.clear();
        }
        // Build up our list of coffee shops.
        response.businesses.forEach((coffeeShop) => {
          this.dataService.addCoffeeShop(
            new CoffeeShop(coffeeShop)
          );
        })
      })
      .catch((error) => {
        // If there's a problem, we log it to the console.
        this.isLoading.emit(false);
        console.log(`There was a problem getting Yelp data: ${error}`);
      });
  }
}
