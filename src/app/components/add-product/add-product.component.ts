import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubstanceService} from "../../services/substance.service";
import {SubstanceForm} from "../../models/Substance";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm = this.fb.group({
    name: ['', Validators.required]
  });

  isSubmitting = false;

  constructor(private fb: FormBuilder, private location: Location, private substanceService: SubstanceService, private snackBar: MatSnackBar) {

  }

  onSubmit() {
    const substanceForm: SubstanceForm = this.productForm.value;
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.substanceService.create(substanceForm).subscribe(
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
    this.productForm.reset();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Produit ajouté avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

  goBack() {
    this.location.back();
  }
}
