import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Bovine} from "../../models/Bovine";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  displayedColumns: string[] = ['loopNumber', 'gender', 'coat', 'birthDate', 'pasture'];
  dataSource: MatTableDataSource<Bovine>;

  // Usually, we would also inject a service that fetches the bovines from a server
  constructor() {
    // For the example, we are using some dummy bovines
    const BOVINES: Bovine[] = [
      {
        loopNumber: '1234',
        gender: false,
        coat: 'Black',
        birthDate: new Date(2020, 10, 27),
        pasture: 'Pasture 1'
      },
      {
        loopNumber: '5678',
        gender: true,
        coat: 'Brown',
        birthDate: new Date(2021, 5, 13),
        pasture: 'Pasture 2'
      }
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(BOVINES);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}