import { Component, OnInit } from '@angular/core';
import { ShopifyService, Product } from '../../services/shopify/shopify.service';

@Component({
  selector: 'products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements OnInit {
  constructor(private shopifyService: ShopifyService) {}
  ngOnInit(): void {
    this.shopifyService.fetchAllProducts();
  }

  get products(): Product[] {
    return this.shopifyService.loadedProducts;
  }
}
