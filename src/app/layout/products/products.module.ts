import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FeaturedImageComponent } from './components/featured-image/featured-image.component';
import { ContentComponent } from './components/content/content.component';



@NgModule({
  declarations: [
    ProductsComponent,
    FeaturedImageComponent,
    ContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
