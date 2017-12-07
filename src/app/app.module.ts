import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatChipsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { IntroSliderComponent } from './components/intro-slider/intro-slider.component';
import { IntroSliderSlideComponent } from './components/intro-slider/slide.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CoffeeCustomizerComponent } from './components/customizer/customizer.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';


@NgModule({
  declarations: [
    AppComponent, IntroSliderComponent, IntroSliderSlideComponent,
      PageHeaderComponent, CoffeeCustomizerComponent, ProductsSectionComponent,
      AboutSectionComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatCardModule, MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
