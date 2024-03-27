import {Component} from '@angular/core';
import {PastureDTO} from "../../models/Pasture";
import {Router} from "@angular/router";
import {PastureService} from "../../services/pasture.service";

@Component({
  selector: 'app-pastures',
  templateUrl: './pastures.component.html',
  styleUrl: './pastures.component.css'
})
export class PasturesComponent {
  pastures!: PastureDTO[];

  constructor(private readonly router: Router, private readonly pastureService: PastureService) {
    this.pastureService.getAll().subscribe({
      next: (resp) => {
        this.pastures = resp;
      }
    });
  }

  viewDetails(pastureDTO: PastureDTO) {
    this.router.navigate(['/pasture', pastureDTO.id]);
  }

}
