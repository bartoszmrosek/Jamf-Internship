import { Observable } from "rxjs";
import { Component } from '@angular/core';
import { ProductsService } from '../../../../../app/services/products/products.service';
import { Product } from "src/app/interfaces/product.interface";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  public products$: Observable<Product[]>
 constructor(private productService: ProductsService){
  this.products$ = productService._productList$;
 }
 public openAddingForm(){
  this.productService.openAddingForm();
 }
}
