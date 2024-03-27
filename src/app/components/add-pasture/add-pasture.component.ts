import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PastureService} from "../../services/pasture.service";
import {PasturePostDTO} from "../../models/Pasture";

@Component({
  selector: 'app-add-pasture',
  templateUrl: './add-pasture.component.html',
  styleUrls: ['./add-pasture.component.css']
})
export class AddPastureComponent {
  pastureDTO: PasturePostDTO = {name: '', size: 0};
  isSubmitting = false; // Nouvelle propriété pour suivre l'état de la soumission

  pastureForm = this.fb.group({
    name: ['', Validators.required],
    size: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private pastureService: PastureService,
    private snackBar: MatSnackBar
  ) {
  }

  onSubmit() {
    if (this.pastureForm.valid) {
      this.isSubmitting = true; // Définir à true lors de la soumission
      this.pastureDTO.name = this.pastureForm.get('name')!.value || '';
      this.pastureDTO.size = Number(this.pastureForm.get('size')!.value) || 0;
      this.pastureService.create(this.pastureDTO).subscribe(
        () => {
          this.openSuccessSnackbar();
          this.clearForm();
          this.isSubmitting = false;
        },
        error => {
          console.error('Error creating pasture:', error);
          // Gérer les erreurs ici
          this.isSubmitting = false; // Assurez-vous de réinitialiser en cas d'erreur
        }
      );
    } else {
      // Marquer le formulaire comme touché pour afficher les messages d'erreur
      this.pastureForm.markAllAsTouched();
    }
  }

  clearForm() {
    this.pastureForm.reset({name: '', size: ''});
  }

  openSuccessSnackbar() {
    this.snackBar.open('Pâture ajoutée avec succès', 'Fermer', {
      duration: 5000,
      verticalPosition: "top"
    });
  }
}
