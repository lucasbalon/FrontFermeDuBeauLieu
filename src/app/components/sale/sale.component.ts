import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, of, startWith, switchMap} from "rxjs";
import {SaleService} from "../../services/sale.service";
import {BovineService} from "../../services/bovine.service";
import {SaleForm} from "../../models/Sale";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {
  saleForm!: FormGroup;
  filteredLoopNumbers: undefined | Observable<Array<string>>;
  loopNumbers: string[] = [];

  constructor(private formBuilder: FormBuilder, private saleService: SaleService, private bovinService: BovineService) {
    this.saleForm = this.formBuilder.group({
      bovinLoopNumber: ['', Validators.required],
      saleDate: [new Date(), Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      carrierNumber: ['', [Validators.required, Validators.min(0)]],
      customerNumber: ['', [Validators.required, Validators.min(0)]]
    });
    this.filteredLoopNumbers = this.bovinService.loopNumbers().pipe(
      switchMap(numbers => {
        this.loopNumbers = numbers;
        return this.saleForm.get('bovinLoopNumber')?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        ) ?? of([]);
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.loopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    let saleForm: SaleForm = this.saleForm.value;
    this.saleService.create(saleForm).subscribe();
  }
}
