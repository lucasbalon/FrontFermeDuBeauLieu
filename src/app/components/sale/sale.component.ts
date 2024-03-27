import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SaleService} from "../../services/sale.service";
import {BovineService} from "../../services/bovine.service";
import {SaleForm} from "../../models/Sale";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {
  saleForm!: FormGroup;
  filteredLoopNumbers: Observable<Array<string>> | undefined;
  loopNumbers: string[] = [];
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder, private saleService: SaleService,
              private bovinService: BovineService, private snackBar: MatSnackBar) {
    this.saleForm = this.formBuilder.group({
      bovinLoopNumber: ['', Validators.required],
      saleDate: [new Date(), Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      carrierNumber: ['', [Validators.required, Validators.min(0)]],
      customerNumber: ['', [Validators.required, Validators.min(0)]]
    });
    this.initLoopNumbers();
  }

  initLoopNumbers(): void {
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

  onSubmit() {
    const saleForm: SaleForm = this.saleForm.value;
    if (this.saleForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.saleService.create(saleForm).subscribe(
        () => {
          this.isSubmitting = false;
          this.openSuccessSnackbar();
          this.clearForm();
        },
        error => {
          console.error('Error submitting form:', error);
          this.isSubmitting = false;
        }
      );
    }
  }

  clearForm() {
    this.saleForm.reset();
    this.initLoopNumbers();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Vente créée avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.loopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }
}
