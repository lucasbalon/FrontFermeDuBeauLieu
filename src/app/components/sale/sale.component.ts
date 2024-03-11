import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {
  saleForm!: FormGroup;
  filteredMotherLoopNumbers: undefined | Observable<Array<string>>;
  motherLoopNumbers = ['Number 1', 'Number 2', 'Number 3'];

  constructor(private formBuilder: FormBuilder) {
    this.saleForm = this.formBuilder.group({
      motherLoopNumber: ['', Validators.required],
      saleDate: [new Date(), Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      carrierNumber: ['', [Validators.required, Validators.min(0)]],
      customerNumber: ['', [Validators.required, Validators.min(0)]]
    });
    this.filteredMotherLoopNumbers = this.saleForm.get('motherLoopNumber')?.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnInit() {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.saleForm.valid) {
      console.log(this.saleForm.value);
    }
  }
}
