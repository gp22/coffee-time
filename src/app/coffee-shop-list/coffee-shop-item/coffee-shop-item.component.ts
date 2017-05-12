import { Component, Input } from '@angular/core';
import { CoffeeShop } from '../../shared/coffee-shop.model';

@Component({
  selector: 'app-coffee-shop-item',
  templateUrl: './coffee-shop-item.component.html',
  styleUrls: ['./coffee-shop-item.component.css']
})
export class CoffeeShopItemComponent {
  /*
  Input the individual coffee shop to display from
  coffee-shop-list.component.html.
  */
  @Input() coffeeShop: CoffeeShop;
}