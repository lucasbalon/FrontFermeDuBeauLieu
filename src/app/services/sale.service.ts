import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {SaleForm} from "../models/Sale";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) {
  }

  create(saleForm: SaleForm): Observable<any> {
    return this._httpClient.post(`${this._urlBack}/sale/create`, saleForm);
  }
}
