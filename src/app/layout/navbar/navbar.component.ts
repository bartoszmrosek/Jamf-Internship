import { Component } from '@angular/core';
import { ProductsService } from '../../../app/services/products/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private productsService: ProductsService) {}

  public openAddingForm(){
    this.productsService.openAddingForm();
  }
}
