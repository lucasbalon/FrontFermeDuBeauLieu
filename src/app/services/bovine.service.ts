import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BirthForm, FullBovin, ReducedBovin} from "../models/Bovine";
import {Observable} from "rxjs";
import {BovinShortDTO} from "../models/Pasture";

@Injectable({
  providedIn: 'root'
})
export class BovineService {

  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) {
  }

  birth(birthForm: BirthForm): Observable<any> {
    return this._httpClient.post(`${this._urlBack}/bovin`, birthForm);
  }

  extbirth(birthForm: BirthForm): Observable<any> {
    return this._httpClient.post(`${this._urlBack}/bovin/short`, birthForm);
  }

  loopNumbers(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._urlBack}/bovin/loopNumbers`);
  }

  bullLoopNumbers(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._urlBack}/bovin/loopNumbers/bull`);
  }

  cowLoopNumbers(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._urlBack}/bovin/loopNumbers/cow`);
  }

  getAll(): Observable<ReducedBovin[]> {
    return this._httpClient.get<ReducedBovin[]>(`${this._urlBack}/bovin`);
  }

  getById(id: number): Observable<FullBovin> {
    return this._httpClient.get<FullBovin>(`${this._urlBack}/bovin/id/${id}`);
  }

  getAvailableBulls(): Observable<BovinShortDTO[]> {
    return this._httpClient.get<BovinShortDTO[]>(`${this._urlBack}/bovin/bull/available`);
  }

  getByStatus(status: String): Observable<ReducedBovin[]> {
    return this._httpClient.get<ReducedBovin[]>(`${this._urlBack}/bovin/status/${status}`);
  }
}
