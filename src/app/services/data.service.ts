import { CoffeeShop } from '../shared/coffee-shop.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  coffeeShops: CoffeeShop[] = [];

  clear() {
    this.coffeeShops.length = 0;
  }
}
