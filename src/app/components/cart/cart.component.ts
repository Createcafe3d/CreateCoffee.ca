import { Component } from '@angular/core';
import { ShopifyService, LineItem } from '../../services/shopify/shopify.service';

@Component({
  selector: 'create-coffee-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private shopify: ShopifyService) {}

  get itemCount(): number {
    return this.shopify.cartItems.length;
  }

  get items(): LineItem[] {
    return this.shopify.cartItems;
  }
}
