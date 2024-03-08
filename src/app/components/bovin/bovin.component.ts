import { Component } from '@angular/core';

@Component({
  selector: 'app-bovin',
  templateUrl: './bovin.component.html',
  styleUrl: './bovin.component.css'
})
export class BovinComponent {
  cow = {
    loopNumber: "1234",
    coat: "Noir",
    gender: true, // true pour mâle
    birthDate: new Date(2020, 1, 1),
    cesarean: false, // false signifie qu'il n'y a pas eu de césarienne
    status: "Healthy",
    father: "Bull 1",
    mother: "Cow 1",
    pasture: "Pasture 1",
    saleDate: new Date(2023, 1, 1),
    amount: 2000.0,
    carrierNumber: 1234,
    customerNumber: 5678,
    children: ["Child 1", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2", "Child 2"],
    injections: ["Injection 1", "Injection 2"],
    ultrasounds: ["Ultrasound 1", "Ultrasound 2"]
  };

  constructor() { }

  ngOnInit() {
    // Charger les informations sur le bovin ici
  }
}
