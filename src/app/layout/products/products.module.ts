import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FeaturedImageComponent } from './components/featured-image/featured-image.component';
import { ContentComponent } from './components/content/content.component';
import { ProductsService } from '../../../app/services/products/products.service';
import { AddingFormComponent } from './components/adding-form/adding-form.component';
import { StyledBtnComponent } from '../../../app/shared/styled-btn/styled-btn.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    FeaturedImageComponent,
    ContentComponent,
    AddingFormComponent,
    StyledBtnComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
