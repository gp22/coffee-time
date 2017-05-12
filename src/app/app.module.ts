import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeShopItemComponent } from './coffee-shop-list/coffee-shop-item/coffee-shop-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QueryFormComponent,
    CoffeeShopListComponent,
    CoffeeShopItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
