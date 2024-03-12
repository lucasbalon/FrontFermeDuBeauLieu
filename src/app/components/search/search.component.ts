import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
//import {Bovine} from "../../models/Bovine";
import {map} from "rxjs";
import {Router} from "@angular/router";
import {ReducedBovin} from "../../models/Bovine";
import {BovineService} from "../../services/bovine.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ['loopNumber', 'gender', 'coat', 'birthDate', 'pasture'];
  dataSource!: MatTableDataSource<ReducedBovin>;
  noData: any;
  bovins!: ReducedBovin[];

  constructor(private readonly _router: Router, private readonly _bovineService: BovineService) {
    this._bovineService.getAll().subscribe({
      next: (resp) => {
        this.bovins = resp;
        this.dataSource = new MatTableDataSource(this.bovins);
        this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(row: ReducedBovin) {
    this._router.navigate(['/bovin', row.id]);
  }

}
