import { Component } from '@angular/core';
import { ShopifyService } from '../../services/shopify/shopify.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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
}
