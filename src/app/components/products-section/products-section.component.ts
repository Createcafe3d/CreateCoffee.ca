import { Component, OnInit } from '@angular/core';
import { ShopifyService, Product } from '../../services/shopify/shopify.service';

@Component({
  selector: 'products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements OnInit {
  constructor(private shopifyService: ShopifyService) {}

  currOffset = 0;
  PAGE_SIZE = 6;

  ngOnInit(): void {
    this.shopifyService.fetchAllProducts();
  }

  get products(): Product[] {
    return this.shopifyService.loadedProducts.slice(this.currOffset, this.currOffset + this.PAGE_SIZE);
  }

  loadingProducts(): any[] {
    return new Array(this.PAGE_SIZE).fill({});
  }

  nextProducts(): void {
    if (this.hasNext) {
      this.currOffset += this.PAGE_SIZE - 1;
    } else {
      this.currOffset = 0;
    }
  }

  prevProducts(): void {
    if (this.hasPrev) {
      if (this.currOffset < this.PAGE_SIZE) {
        this.currOffset = 0;
      } else {
        this.currOffset -= (this.PAGE_SIZE - 1);
      }
    } else {
      this.currOffset = this.shopifyService.loadedProducts.length - (this.PAGE_SIZE - 1);
    }
  }

  get hasNext(): boolean {
    return this.shopifyService.loadedProducts.length > this.currOffset + this.PAGE_SIZE - 1;
  }

  get hasPrev(): boolean {
    return this.currOffset > 0;
  }
}
