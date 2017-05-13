export class CoffeeShop {
    public name: string;
    public url: string;
    public image_url: string;
    public id: string;
    public address: string;
    public city: string;
    public state: string;
    public going: number;

  constructor(coffeeShop) {
    this.name = coffeeShop.name;
    this.url = coffeeShop.url;
    this.image_url = coffeeShop.image_url;
    this.id = coffeeShop.id;
    this.address = coffeeShop.address;
    this.city = coffeeShop.city;
    this.state = coffeeShop.state;
    this.going = coffeeShop.going;
  }
}