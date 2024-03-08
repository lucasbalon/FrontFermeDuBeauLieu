import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.css'
})
export class ScanComponent {
  ultrasoundForm = this.fb.group({
    scanDate: [new Date(), Validators.required],
    motherLoopNumber: ['', Validators.required],
    isPregnant: [false]
  });

  motherLoopNumbers: string[] = ['123', '456', '789']; // Remplacer cette liste par vos numéros réels
  filteredMotherLoopNumbers: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    this.filteredMotherLoopNumbers = this.ultrasoundForm.get('motherLoopNumber')!.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this.filter(value || ''))
    );
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(loopNumber => loopNumber.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.ultrasoundForm.value);
  }
}
