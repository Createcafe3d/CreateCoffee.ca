import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule, MatDialogModule, MatTableModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { IntroSliderComponent } from './components/intro-slider/intro-slider.component';
import { IntroSliderSlideComponent } from './components/intro-slider/slide.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CoffeeCustomizerComponent } from './components/customizer/customizer.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { ProductItemComponent } from './components/products-section/product-item.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ContactSectionComponent, ContactFormDialogComponent } from './components/contact-section/contact-section.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';

import { ShopifyService } from './services/shopify/shopify.service';
import { CartComponent, CartPreviewDialogComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent, IntroSliderComponent, IntroSliderSlideComponent,
      PageHeaderComponent, CoffeeCustomizerComponent, ProductsSectionComponent,
      AboutSectionComponent, ContactSectionComponent, PageFooterComponent,
      ProductItemComponent, CartComponent, CartPreviewDialogComponent, ContactFormDialogComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatIconModule, MatDialogModule, MatTableModule,
    MatSnackBarModule
  ],
  entryComponents: [CartPreviewDialogComponent, ContactFormDialogComponent],
  providers: [ShopifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
