import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CoffeeShop } from '../shared/coffee-shop.model';

@Component({
  selector: 'app-coffee-shop-list',
  templateUrl: './coffee-shop-list.component.html',
  styleUrls: ['./coffee-shop-list.component.css']
})
export class CoffeeShopListComponent implements OnInit {
  coffeeShops: CoffeeShop[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.coffeeShops = this.dataService.coffeeShops;
  }
}
