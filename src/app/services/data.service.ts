import { CoffeeShop } from '../shared/coffee-shop.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private coffeeShops: CoffeeShop[] = [];

  getAllCoffeeShops() {
    return this.coffeeShops;
  }

  addCoffeeShop(coffeeShop: CoffeeShop) {
    this.coffeeShops.push(coffeeShop);
  }

  getCoffeeShopsLength() {
    return this.coffeeShops.length;
  }

  clear() {
    this.coffeeShops.length = 0;
  }
}
