import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
//import {Bovine} from "../../models/Bovine";
import {debounceTime, distinctUntilChanged, map, Subject} from "rxjs";
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
  bovins!: ReducedBovin[];
  private searchTerms = new Subject<string>();

  constructor(private readonly _router: Router, private readonly _bovineService: BovineService) {
    this._bovineService.getAll().subscribe({
      next: (resp) => {
        this.bovins = resp;
        this.dataSource = new MatTableDataSource(this.bovins);
        this.dataSource.sort = this.sort;
      }
    });
    this.searchTerms.pipe(
      debounceTime(300),        // delay execution
      distinctUntilChanged()    // if next search term is same as previous
    )
      .subscribe(searchTerm => {
        this.dataSource.filter = searchTerm.trim().toLowerCase();
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTerms.next(filterValue.trim());
  }

  viewDetails(row: ReducedBovin) {
    this._router.navigate(['/bovin', row.id]);
  }

}
