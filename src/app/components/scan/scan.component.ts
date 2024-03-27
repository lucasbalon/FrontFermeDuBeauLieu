import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {ScanService} from "../../services/scan.service";
import {ScanForm} from "../../models/Scan";
import {BovineService} from "../../services/bovine.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  ultrasoundForm = this.fb.group({
    scan_date: [new Date(), Validators.required],
    result: [false, Validators.required],
    loopNumber: ['', Validators.required]
  });

  motherLoopNumbers: string[] = [];
  filteredMotherLoopNumbers: Observable<Array<string>> | undefined;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private scanService: ScanService,
              private bovineService: BovineService, private snackBar: MatSnackBar) {
    this.initCowLoopNumber();
  }

  initCowLoopNumber(): void {
    this.filteredMotherLoopNumbers = this.bovineService.cowLoopNumbers().pipe(
      switchMap(numbers => {
        this.motherLoopNumbers = numbers;
        return this.ultrasoundForm.get('loopNumber')?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value!))
        ) ?? of([]);
      })
    );
  }

  onSubmit() {
    const scanForm: ScanForm = this.ultrasoundForm.value;
    if (this.ultrasoundForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.scanService.create(scanForm).subscribe(
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
    this.ultrasoundForm.reset();
    this.initCowLoopNumber();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Echographie créée avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }
}
