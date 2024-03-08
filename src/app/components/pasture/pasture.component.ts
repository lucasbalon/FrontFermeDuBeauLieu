import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-pasture',
  templateUrl: './pasture.component.html',
  styleUrl: './pasture.component.css'
})
export class PastureComponent {
  todo = ['Vache 1', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4', 'Vache 2', 'Vache 3', 'Vache 4'];

  done = ['Vache 5', 'Vache 6', 'Vache 7', 'Vache 8', 'Vache 9'];

  filteredTodo: string[] = this.todo;
  filteredDone: string[] = this.done;

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
}
