import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BovineService} from "../../services/bovine.service";
import {Router} from "@angular/router";
import {BirthForm} from "../../models/Bovine";
import {Location} from "@angular/common";

@Component({
  selector: 'app-ext-birth',
  templateUrl: './ext-birth.component.html',
  styleUrl: './ext-birth.component.css'
})
export class ExtBirthComponent {

  cowBirthForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bovineService: BovineService, private router: Router, private location: Location) {

    this.cowBirthForm = this.formBuilder.group({
      loopNumber: ['', Validators.required],
      coat: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    let birthForm: BirthForm = this.cowBirthForm.value;
    // Make sure to update your BirthForm model to reflect the form changes
    this.bovineService.extbirth(birthForm).subscribe();
    console.log(birthForm);
  }

  goBack() {
    this.location.back();
  }

}
