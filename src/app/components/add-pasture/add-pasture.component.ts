import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, startWith} from "rxjs";
import {PastureService} from "../../services/pasture.service";
import {PasturePostDTO} from "../../models/Pasture";

@Component({
  selector: 'app-add-pasture',
  templateUrl: './add-pasture.component.html',
  styleUrl: './add-pasture.component.css'
})
export class AddPastureComponent {
  pastureDTO: PasturePostDTO = {name: '', size: 0 };

  pastureForm = this.fb.group({
    name: ['', Validators.required],
    size: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private pastureService: PastureService) {
  }

  onSubmit() {
    this.pastureDTO.name = this.pastureForm.get('name')!.value || '';
    this.pastureDTO.size = Number(this.pastureForm.get('size')!.value) || 0;
    this.pastureService.create(this.pastureDTO).subscribe();
  }
}
