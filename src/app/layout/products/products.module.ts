import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FeaturedImageComponent } from './components/featured-image/featured-image.component';



@NgModule({
  declarations: [
    ProductsComponent,
    FeaturedImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }