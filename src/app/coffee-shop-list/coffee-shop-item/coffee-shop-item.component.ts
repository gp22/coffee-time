import { CoffeeShop } from '../../shared/coffee-shop.model';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coffee-shop-item',
  templateUrl: './coffee-shop-item.component.html',
  styleUrls: ['./coffee-shop-item.component.css']
})
export class CoffeeShopItemComponent {

  constructor(private authService: AuthService,
              private eventService: EventService) { }

  /*
  Input the individual coffee shop to display from
  coffee-shop-list.component.html.
  */
  @Input() coffeeShop: CoffeeShop;

  // Add the current logged in user to the event this.coffeeShop.
  addUserToEvent() {
    this.eventService.addUserToEvent(this.coffeeShop)
      .subscribe(
        (response) => {
          this.coffeeShop.going = response.going.length;
        },
        (error) => {
          console.error(`There was a problem adding you: ${error}`);
        }
      );
  }
}
