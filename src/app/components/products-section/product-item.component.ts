import { Component, OnInit, Input } from '@angular/core';
import { ShopifyService, Product } from '../../services/shopify/shopify.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product;
  constructor(private shopify: ShopifyService, private snackBar: MatSnackBar) {}

  addProductToCart(quantity?: number) {
    quantity = quantity || 1;
    this.shopify.addProductToCart(this.product, quantity);
    let name = this.product.name;
    if (name.length > 25) {
      name = name.slice(0, 23) + '...';
    }
    this.snackBar.open('Added "' + name + '" to cart.', null, {duration: 1000});
  }
}
