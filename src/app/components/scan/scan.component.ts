import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable, of, startWith, switchMap} from "rxjs";
import {ScanService} from "../../services/scan.service";
import {ScanForm} from "../../models/Scan";
import {BovineService} from "../../services/bovine.service";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.css'
})
export class ScanComponent {
  ultrasoundForm = this.fb.group({
    scan_date: [new Date(), Validators.required],
    result: [false, Validators.required],
    loopNumber: ['', Validators.required]
  });

  motherLoopNumbers: string[] = [];
  filteredMotherLoopNumbers: undefined | Observable<Array<string>>;

  constructor(private fb: FormBuilder, private scanService: ScanService, private bovineService: BovineService) {
    this.filteredMotherLoopNumbers = this.bovineService.cowLoopNumbers().pipe(
      switchMap(numbers => {
        this.motherLoopNumbers = numbers;
        return this.ultrasoundForm.get('loopNumber')?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value!))
        ) ?? of([]);
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    const scanForm: ScanForm = this.ultrasoundForm.value;
    this.scanService.create(scanForm).subscribe();
  }
}
