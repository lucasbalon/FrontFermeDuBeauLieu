import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {
  saleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.saleForm = this.formBuilder.group({
      saleDate: [new Date(), Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      carrierNumber: ['', [Validators.required, Validators.min(0)]],
      customerNumber: ['', [Validators.required, Validators.min(0)]],
      loopNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.saleForm.valid) {
      console.log(this.saleForm.value);
    }
  }
}
