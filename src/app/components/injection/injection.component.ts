import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable, of, startWith, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {InjectionService} from "../../services/injection.service";
import {BovineService} from "../../services/bovine.service";
import {InjectionForm} from "../../models/Injection";
import {SubstanceService} from "../../services/substance.service";
import {SubstanceForm} from "../../models/Substance";

@Component({
  selector: 'app-injection',
  templateUrl: './injection.component.html',
  styleUrl: './injection.component.css'
})
export class InjectionComponent {
  injectionForm = this.fb.group({
    injectionDate: [new Date(), Validators.required],
    substanceName: ['', Validators.required],
    bovinLoopNumber: ['', Validators.required]
  });

  cowLoopNumbers: string[] = ['123', '456', '789']; // Remplacer cette liste par vos numéros de boucle de vache réels
  products: SubstanceForm[] = [];
  filteredCowLoopNumbers: Observable<string[]>;

  constructor(private fb: FormBuilder, private readonly _router: Router, private injectionService: InjectionService, private bovineService: BovineService, private substanceService: SubstanceService) {
    this.filteredCowLoopNumbers = this.bovineService.cowLoopNumbers().pipe(
      switchMap(numbers => {
        this.cowLoopNumbers = numbers;
        return this.injectionForm.get('bovinLoopNumber')?.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value!))
        ) ?? of([]);
      })
    );
    this.substanceService.getAll().subscribe({
      next: (resp) => {
        //todo: faire en sorte que products ne récupère pas des objets, mais juste des string
        this.products = resp;
      }
    });
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cowLoopNumbers.filter(loopNumber => loopNumber.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    let form: InjectionForm = {
      bovinLoopNumber: <string>this.injectionForm.get('bovinLoopNumber')?.value,
      injectionDate: <Date>this.injectionForm.get('injectionDate')?.value,
      substanceName: <string>this.injectionForm.get('substanceName')?.value,
    };
    this.injectionService.create(form).subscribe();
  }

  addProduct() {
    this._router.navigate(['add-product']);
  }
}
