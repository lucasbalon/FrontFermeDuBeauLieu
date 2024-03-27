import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InjectionService} from "../../services/injection.service";
import {BovineService} from "../../services/bovine.service";
import {InjectionForm} from "../../models/Injection";
import {SubstanceService} from "../../services/substance.service";
import {SubstanceForm} from "../../models/Substance";

@Component({
  selector: 'app-injection',
  templateUrl: './injection.component.html',
  styleUrls: ['./injection.component.css']
})
export class InjectionComponent {
  injectionForm = this.fb.group({
    injectionDate: [new Date(), Validators.required],
    substanceName: ['', Validators.required],
    bovinLoopNumber: ['', Validators.required]
  });

  cowLoopNumbers: string[] = [];
  products: SubstanceForm[] = [];
  filteredCowLoopNumbers: Observable<string[]> | undefined;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private readonly _router: Router, private injectionService: InjectionService,
              private bovineService: BovineService, private substanceService: SubstanceService, private snackBar: MatSnackBar) {
    this.initLists();
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cowLoopNumbers.filter(loopNumber => loopNumber.toLowerCase().includes(filterValue));
  }

  initLists(): void {
    this.filteredCowLoopNumbers = this.bovineService.loopNumbers().pipe(
      switchMap(numbers => {
        this.cowLoopNumbers = numbers;
        return this.injectionForm.get('bovinLoopNumber')?.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value!))
        ) ?? of([]);
      })
    );
    this.substanceService.getAll().subscribe({
      next: (resp) => {
        this.products = resp;
      }
    });
  }

  onSubmit() {
    let form: InjectionForm = {
      bovinLoopNumber: <string>this.injectionForm.get('bovinLoopNumber')?.value,
      injectionDate: <Date>this.injectionForm.get('injectionDate')?.value,
      substanceName: <string>this.injectionForm.get('substanceName')?.value,
    };
    if (this.injectionForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.injectionService.create(form).subscribe(
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
    this.injectionForm.reset();
    this.initLists();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Injection créée avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

  addProduct() {
    this._router.navigate(['add-product']);
  }
}
