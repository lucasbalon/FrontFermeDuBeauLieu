import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {map, Observable, startWith} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pasture',
  templateUrl: './pasture.component.html',
  styleUrl: './pasture.component.css'
})
export class PastureComponent {
  bull = '6473';
  pastureForm: FormGroup;
  motherLoopNumbers = ['Number 1', 'Number 2', 'Number 3'];
  filteredMotherLoopNumbers: undefined | Observable<Array<string>>;
  todo = ['Vache 1', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4'];

  done = ['Vache 5', 'Vache 6', 'Vache 7', 'Vache 8', 'Vache 9'];

  filteredTodo: string[] = this.todo;
  filteredDone: string[] = this.done;

  constructor(private formBuilder: FormBuilder) {
    this.pastureForm = this.formBuilder.group({
      motherLoopNumber: ['', Validators.required]
    });
    this.filteredMotherLoopNumbers = this.pastureForm.get('motherLoopNumber')?.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSearchChange(event: Event, list: 'todo' | 'done'): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (list === 'todo') {
      this.filteredTodo = this.todo.filter(item => item.toLowerCase().includes(searchTerm));
    } else if (list === 'done') {
      this.filteredDone = this.done.filter(item => item.toLowerCase().includes(searchTerm));
    }
  }

  //todo: filtrer avec la recherche par numero, et appeler l'alerte consanguinité ici.

  drop(event: CdkDragDrop<string[]>) {
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
    console.log(this.pastureForm.value);
  }
}
