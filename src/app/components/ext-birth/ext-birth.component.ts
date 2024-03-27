import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BovineService} from "../../services/bovine.service";
import {BirthForm} from "../../models/Bovine";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ext-birth',
  templateUrl: './ext-birth.component.html',
  styleUrl: './ext-birth.component.css'
})
export class ExtBirthComponent {

  cowBirthForm: FormGroup;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder, private bovineService: BovineService,
              private location: Location, private snackBar: MatSnackBar) {

    this.cowBirthForm = this.formBuilder.group({
      loopNumber: ['', Validators.required],
      coat: ['', Validators.required],
      gender: [false, Validators.required],
      birthDate: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    let birthForm: BirthForm = this.cowBirthForm.value;
    if (this.cowBirthForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.bovineService.extbirth(birthForm).subscribe(
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
    this.cowBirthForm.reset();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Bovin ajouté avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

  goBack() {
    this.location.back();
  }
}
