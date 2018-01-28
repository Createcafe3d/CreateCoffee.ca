import { Component, Inject } from '@angular/core';
import { ShopifyService, LineItem, Totals } from '../../services/shopify/shopify.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar } from '@angular/material';

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

  displayedColumns = ['itemName', 'quantity', 'price', 'del'];

  constructor(
    public dialogRef: MatDialogRef<CartPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private shopify: ShopifyService
  ) { }

  get items(): LineItem[] {
    return this.shopify.cartItems;
  }

  get tableItems(): MatTableDataSource<LineItem> {
    return new MatTableDataSource<LineItem>(this.items);
  }

  get totals(): Totals {
    return this.shopify.totals;
  }

  checkout(): void {
    window.open(this.shopify.checkoutUrl, '_blank');
  }

  clearCart(): void {
    const itemsToRemove: string[] = [];
    this.items.forEach((item) => {
      itemsToRemove.push(item.id);
    });
    this.shopify.removeProductsFromCart(itemsToRemove);
    this.snackBar.open('Cleared cart.', null, {duration: 1000});
    this.dialogRef.close();
  }

  removeItem(productId: string, productName?: string) {
    this.shopify.removeProductsFromCart([productId]);
    const name = productName ? '"' + this.getShortName(productName, 25) + '"' : 'item';
    this.snackBar.open('Removed ' + name + ' from cart.', null, {duration: 1000});
    if (this.items.length < 2) {
      this.dialogRef.close();
    }
  }

  increaseQuantity(productId: string, initialQuantity: number) {
    this.shopify.updateProductInCart(productId, (initialQuantity + 1));
  }

  decreaseQuantity(productId: string, initialQuantity: number, productName?: string) {
    if (initialQuantity < 2) {
      this.removeItem(productId, productName);
    } else {
      this.shopify.updateProductInCart(productId, (initialQuantity - 1));
    }
  }

  getPrice(quantity: number, price: string) {
    return quantity * parseFloat(price);
  }

  getShortName(name: string, stripAt?: number): string {
    stripAt = stripAt || 35;
    if (name.length > stripAt) {
      return name.slice(0, stripAt - 3) + '...';
    }
    return name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
