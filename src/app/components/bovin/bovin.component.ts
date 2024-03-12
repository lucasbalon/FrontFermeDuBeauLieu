import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FullBovin, Status} from "../../models/Bovine";
import {BovineService} from "../../services/bovine.service";

@Component({
  selector: 'app-bovin',
  templateUrl: './bovin.component.html',
  styleUrl: './bovin.component.css'
})
export class BovinComponent {
  bovin!: FullBovin;

  //todo: ERROR TypeError: Cannot read properties of undefined (reading 'loopNumber')

  constructor(private route: ActivatedRoute, private bovinService: BovineService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id);
      this.bovinService.getById(numericId).subscribe({
        next: (value) => {
          this.bovin = value;
        }
      });
    } else {
      alert("error");
    }
  }

}
