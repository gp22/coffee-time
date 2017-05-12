import { Injectable } from '@angular/core';
import { CoffeeShop } from '../shared/coffee-shop.model';

@Injectable()
export class DataService {
  coffeeShops: CoffeeShop[] = [];

  clear() {
    this.coffeeShops.length = 0;
  }
}