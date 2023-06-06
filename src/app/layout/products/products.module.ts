import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FeaturedImageComponent } from './components/featured-image/featured-image.component';
import { ContentComponent } from './components/content/content.component';
import { ProductsService } from '../../../app/services/products/products.service';
import { AddingFormComponent } from './components/adding-form/adding-form.component';



@NgModule({
  declarations: [
    ProductsComponent,
    FeaturedImageComponent,
    ContentComponent,
    AddingFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
