import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {BovineService} from "../../services/bovine.service";
import {BirthForm} from "../../models/Bovine";

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrl: './birth.component.css'
})
export class BirthComponent {

  cowBirthForm: FormGroup;
  motherLoopNumbers = ['1', '2', 'Number 3'];
  filteredMotherLoopNumbers: undefined | Observable<Array<string>>;

  constructor(private formBuilder: FormBuilder, private bovineService: BovineService) {
    this.cowBirthForm = this.formBuilder.group({
      loopNumber: ['', Validators.required],
      coat: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: [new Date(), Validators.required],
      cesarean: ['', Validators.required],
      motherLoopNumber: ['', Validators.required]
    });
    this.filteredMotherLoopNumbers = this.cowBirthForm.get('motherLoopNumber')?.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnInit(): void {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.motherLoopNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    let birthForm: BirthForm = this.cowBirthForm.value;
    this.bovineService.birth(birthForm).subscribe();
    console.log(birthForm);
  }

}