import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {map, Observable, startWith} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BovinShortDTO} from "../../models/Pasture";
import {PastureService} from "../../services/pasture.service";
import {BovineService} from "../../services/bovine.service";

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

  filteredAvailableCows!: BovinShortDTO[];
  filteredCowsInPasture!: BovinShortDTO[];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private pastureService: PastureService, private bovinService: BovineService, private router: Router) {
    this.pastureForm = this.formBuilder.group({
      motherLoopNumber: ['', Validators.required]
    });

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bullsLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSearchChange(event: Event, list: 'todo' | 'done'): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (list === 'todo') {
      this.filteredAvailableCows = this.cowsAvailable.filter(item => item.loopNumber.toLowerCase().includes(searchTerm));
    } else if (list === 'done') {
      this.filteredCowsInPasture = this.cowsInPature.filter(item => item.loopNumber.toLowerCase().includes(searchTerm));
    }
  }

  //todo: filtrer avec la recherche par numero, et appeler l'alerte consanguinité ici.

  drop(event: CdkDragDrop<BovinShortDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  onSubmit(): void {
    const selectedOption = this.pastureForm.get('motherLoopNumber')!.value;
    console.log("Selected Option: ", selectedOption);

    this.pastureService.assignBull(this.numericId, selectedOption).subscribe({
      next: (value) => {
        // handle success
      },
      error: (error) => {
        // handle error
      }
    });
  }
}
