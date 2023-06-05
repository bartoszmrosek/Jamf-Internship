import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './products/components/navbar/navbar.component';
import { ProductsRootComponent } from './products/products-root/products-root.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsRootComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
