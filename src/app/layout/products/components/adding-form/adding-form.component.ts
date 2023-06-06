import { Observable } from "rxjs";
import { Component } from '@angular/core';
import { ProductsService } from "../../../../../app/services/products/products.service";

@Component({
  selector: 'app-adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: ['./adding-form.component.scss']
})
export class AddingFormComponent {
  public shouldOpenForm$: Observable<boolean>;
  constructor(private productsService: ProductsService){
    this.shouldOpenForm$ = productsService._isAdding$;
  }
  public closeForm(){
    this.productsService.stopAddingForm()
  }
}
