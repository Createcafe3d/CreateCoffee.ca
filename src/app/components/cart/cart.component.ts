import { Component, Inject } from '@angular/core';
import { ShopifyService, LineItem } from '../../services/shopify/shopify.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'create-coffee-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private shopify: ShopifyService, private dialog: MatDialog) {}

  get itemCount(): number {
    return this.shopify.cartItems.length;
  }

  openCart(): void {
    this.dialog.open(CartPreviewDialogComponent, {
      width: '80%'
    });
  }
}

@Component({
  selector: 'cart-preview',
  templateUrl: './cart-preview-dialog.component.html',
  styleUrls: ['./cart-preview-dialog.component.scss'],
})
export class CartPreviewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CartPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shopify: ShopifyService
  ) { }

  get items(): LineItem[] {
    return this.shopify.cartItems;
  }

  removeItem(productId: string) {
    this.shopify.removeProductFromCart(productId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
