import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';

export const INITIAL_PRODUCTS: readonly Product[] = [
  {
    name: "MacBook Air 13”",
    price: 4999.00,
    imageUrl: "assets/device-1.jfif"
  },
  {
    name: "iMac 27”",
    price: 7499.00,
    imageUrl: "assets/device-2.jfif"
  },
  {
    name: "iPad air M1",
    price: 2999.90,
    imageUrl: "assets/device-3.png"
  },
  {
    name: "Apple watch 7",
    price: 2649.00,
    imageUrl: "assets/device-4.jfif"
  }
]

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private _isAdding: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly _isAdding$ = this._isAdding.asObservable();

  private _productsList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([...INITIAL_PRODUCTS]);
  public readonly _productList$ = this._productsList.asObservable();

  public openAddingForm(){
    return this._isAdding.next(true)
  }

  public stopAddingForm(){
    return this._isAdding.next(false)
  }

  addProduct(product: Product){
    const products = this._productsList.getValue();
    this._productsList.next([...products, product])
  }
}
