import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {map, Observable, startWith} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BovinShortDTO} from "../../models/Pasture";
import {PastureService} from "../../services/pasture.service";
import {BovineService} from "../../services/bovine.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pasture',
  templateUrl: './pasture.component.html',
  styleUrl: './pasture.component.css'
})
export class PastureComponent {
  pastureName!: string;
  bull!: string;
  pastureForm: FormGroup;
  bullsLoopNumbers!: string[];
  filteredBullsLoopNumbers: undefined | Observable<Array<string>>;
  cowsAvailable!: BovinShortDTO[];
  cowsInPature!: BovinShortDTO[];

  numericId!: number;
  isSubmitting = false;

  filteredAvailableCows!: BovinShortDTO[];
  filteredCowsInPasture!: BovinShortDTO[];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private pastureService: PastureService, private bovinService: BovineService, private router: Router, private snackBar: MatSnackBar) {
    this.pastureForm = this.formBuilder.group({
      motherLoopNumber: ['', Validators.required]
    });

    this.getAvailableBulls();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.numericId = Number(id);
      this.pastureService.getById(this.numericId).subscribe({
        next: (value) => {
          this.bull = value.actualBull;
          this.cowsAvailable = value.availableCows;
          this.cowsInPature = value.pastureCows;
          this.pastureName = value.name;
          this.filteredAvailableCows = this.cowsAvailable;
          this.filteredCowsInPasture = this.cowsInPature;
        }
      });
    } else {
      alert("error");
    }
  }

  getAvailableBulls(): void {
    this.bovinService.getAvailableBulls().subscribe({
      next: (value) => {
        this.bullsLoopNumbers = value.map(bovin => bovin.loopNumber);
        this.filteredBullsLoopNumbers = this.pastureForm.get('motherLoopNumber')?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }
    });
  }

  onSearchChange(event: Event, list: 'todo' | 'done'): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (list === 'todo') {
      this.filteredAvailableCows = this.cowsAvailable.filter(item => item.loopNumber.toLowerCase().includes(searchTerm));
    } else if (list === 'done') {
      this.filteredCowsInPasture = this.cowsInPature.filter(item => item.loopNumber.toLowerCase().includes(searchTerm));
    }
  }

  onSubmit(): void {
    const selectedOption = this.pastureForm.get('motherLoopNumber')!.value;
    this.isSubmitting = true;

    this.pastureService.assignBull(this.numericId, selectedOption).subscribe({
      next: (value) => {
        this.reloadLists()
        this.clearForm();
        this.openSuccessSnackbar();
        this.getAvailableBulls();
        this.isSubmitting = false;
      },
      error: (error) => {
        // handle error
        this.isSubmitting = false;
      }
    });
  }

  drop(event: CdkDragDrop<BovinShortDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = event.previousContainer.data[event.previousIndex]; // copy the item
      event.previousContainer.data.splice(event.previousIndex, 1); // remove the item manually

      if (event.container.id === 'available') {
        this.pastureService.removeFromPasture(item.loopNumber).subscribe({
          next: (response) => {
            event.container.data.push(item); // add the item manually
            this.reloadLists();
          },
          error: (error) => {
            // handle error
            console.error(error);
            event.previousContainer.data.splice(event.previousIndex, 0, item); // add back the item if error occurs
          }
        });
      } else if (event.container.id === 'pasture') {
        this.pastureService.updatePasture(this.numericId, item.loopNumber).subscribe({
          next: (response) => {
            event.container.data.push(item); // add the item manually
            this.reloadLists();
          },
          error: (error) => {
            // handle error
            console.error(error);
            event.previousContainer.data.splice(event.previousIndex, 0, item); // add back the item if error occurs
          }
        });
      }
    }
  }

  reloadLists() {
    this.pastureService.getById(this.numericId).subscribe({
      next: (value) => {
        this.bull = value.actualBull;
        this.cowsAvailable = value.availableCows;
        this.cowsInPature = value.pastureCows;
        this.pastureName = value.name;
        this.filteredAvailableCows = this.cowsAvailable;
        this.filteredCowsInPasture = this.cowsInPature;
      },
      error: (error) => {
        // handle error
        console.error(error);
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bullsLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  clearForm() {
    this.pastureForm.reset();
  }

  openSuccessSnackbar() {
    this.snackBar.open('Taureau ajouté avec succès', 'Fermer', {
      duration: 6000,
      verticalPosition: "top"
    });
  }

}
