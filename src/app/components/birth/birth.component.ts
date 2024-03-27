import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, of, startWith, switchMap} from "rxjs";
import {BovineService} from "../../services/bovine.service";
import {BirthForm} from "../../models/Bovine";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrl: './birth.component.css'
})
export class BirthComponent {

  isSubmitting = false;
  cowBirthForm: FormGroup;
  motherLoopNumbers: string[] = [];
  filteredMotherLoopNumbers: undefined | Observable<Array<string>>;

  constructor(private formBuilder: FormBuilder, private bovineService: BovineService, private router: Router, private snackBar: MatSnackBar) {

    this.cowBirthForm = this.formBuilder.group({
      loopNumber: ['', Validators.required],
      coat: ['', Validators.required],
      gender: [false, Validators.required],
      birthDate: [new Date(), Validators.required],
      cesarean: [false, Validators.required],
      motherLoopNumber: ['', Validators.required]
    });
    this.initCowLoopNumber();
  }

  initCowLoopNumber(): void {
    this.filteredMotherLoopNumbers = this.bovineService.cowLoopNumbers().pipe(
      switchMap(numbers => {
        this.motherLoopNumbers = numbers;
        return this.cowBirthForm.get('motherLoopNumber')?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        ) ?? of([]);
      })
    );
  }

  onSubmit(): void {
    let birthForm: BirthForm = this.cowBirthForm.value;
    if (this.cowBirthForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.bovineService.birth(birthForm).subscribe(
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

  goToComponent() {
    this.router.navigate(['ext-birth']);
  }

  clearForm() {
    this.cowBirthForm.reset();
    this.initCowLoopNumber();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Naissance ajoutée avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }


}
