import { Component, OnInit, Input } from '@angular/core';
import { ShopifyService, Product } from '../../services/shopify/shopify.service';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product;
  constructor(private shopify: ShopifyService) {}

  addProductToCart(quantity?: number) {
    quantity = quantity || 1;
    this.shopify.addProductToCart(this.product, quantity);
  }
}
