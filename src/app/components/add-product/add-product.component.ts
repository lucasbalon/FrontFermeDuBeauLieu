import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {SubstanceService} from "../../services/substance.service";
import {SubstanceForm} from "../../models/Substance";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private location: Location, private substanceService: SubstanceService) {

  }

  onSubmit() {
    let substanceForm: SubstanceForm = this.productForm.value;
    this.substanceService.create(substanceForm).subscribe();
  }

  goBack() {
    this.location.back();
  }
}
