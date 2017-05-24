import { CoffeeShop } from '../shared/coffee-shop.model';
import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coffee-shop-list',
  templateUrl: './coffee-shop-list.component.html',
  styleUrls: ['./coffee-shop-list.component.css']
})
export class CoffeeShopListComponent implements OnInit {
  coffeeShops: CoffeeShop[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.coffeeShops = this.dataService.getAllCoffeeShops();
  }
}
