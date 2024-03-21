import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm = this.fb.group({
    product: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private location: Location) {}

  onSubmit() {
    // Handle form submission here
    console.log(this.productForm.value);
  }

  goBack() {
    this.location.back();
  }
}
