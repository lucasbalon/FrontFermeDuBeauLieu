import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-injection',
  templateUrl: './injection.component.html',
  styleUrl: './injection.component.css'
})
export class InjectionComponent {
  injectionForm = this.fb.group({
    injectionDate: [new Date(), Validators.required],
    product: ['', Validators.required],
    cowLoopNumber: ['', Validators.required]
  });

  cowLoopNumbers: string[] = ['123', '456', '789']; // Remplacer cette liste par vos numéros de boucle de vache réels
  products: string[] = ['Product 1', 'Product 2', 'Product 3']; // Remplacer cette liste par vos produits réels
  filteredCowLoopNumbers: Observable<string[]>;

  constructor(private fb: FormBuilder, private readonly _router: Router) {
    this.filteredCowLoopNumbers = this.injectionForm.get('cowLoopNumber')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value || ''))
      );
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cowLoopNumbers.filter(loopNumber => loopNumber.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.injectionForm.value);
  }

  addProduct() {
    this._router.navigate(['add-product']);
  }
}
