import { Observable } from "rxjs";
import { Component, ElementRef } from '@angular/core';
import { ProductsService } from "../../../../../app/services/products/products.service";
import {NgForm} from "@angular/forms"
import {ViewChild} from "@angular/core";
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
    this.productsService.stopAddingForm();
  }
  public productName = "";
  public productPrice = 0;
  public productImageUrl = "";

  public isInputTouched = false;

  @ViewChild('fileInput')
  fileInputRef: ElementRef<HTMLInputElement> | undefined;

  public imgUpload(event: Event){
    this.isInputTouched = true;
    const target = event.target as HTMLInputElement;
    if(target.files && target.files[0]){
      this.productImageUrl = URL.createObjectURL(target.files[0]);
    }
  }

  public onSubmit(form: NgForm){
    if(form.valid && this.productImageUrl){
      this.productsService.addProduct({
        name: this.productName,
        price: this.productPrice,
        imageUrl: this.productImageUrl
      });
      this.productsService.stopAddingForm();
      form.resetForm();
      this.isInputTouched = false;
      if(this.fileInputRef){
        this.fileInputRef.nativeElement.value = "";
      }
    }
  }

  public inputTouched(){
    this.isInputTouched = true;
  }
}
