import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ScanForm} from "../models/Scan";
import {Observable} from "rxjs";
import {SubstanceForm} from "../models/Substance";
import {ReducedBovin} from "../models/Bovine";

@Injectable({
  providedIn: 'root'
})
export class SubstanceService {

  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) { }

  create(substanceForm: SubstanceForm): Observable<any> {
    return this._httpClient.post(`${this._urlBack}/substance`, substanceForm);
  }
  getAll(): Observable<SubstanceForm[]> {
    return this._httpClient.get<SubstanceForm[]>(`${this._urlBack}/substance`);
  }
}
