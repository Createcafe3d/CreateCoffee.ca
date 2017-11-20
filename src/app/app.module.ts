import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { IntroSliderComponent } from './components/intro-slider/intro-slider.component';
import { IntroSliderSlideComponent } from './components/intro-slider/slide.component';


@NgModule({
  declarations: [
    AppComponent, IntroSliderComponent, IntroSliderSlideComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
