import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PastureDTO, PastureFullDTO} from "../models/Pasture";

@Injectable({
  providedIn: 'root'
})
export class PastureService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) { }

  getAll(): Observable<PastureDTO[]> {
    return this._httpClient.get<PastureDTO[]>(`${this._urlBack}/pasture`);
  }
  getById(id: number): Observable<PastureFullDTO> {
    return this._httpClient.get<PastureFullDTO>(`${this._urlBack}/bovin/pasture/` + id);
  }
  updatePasture(pastureId: number, cowLoopnumber: string): Observable<any> {
    return this._httpClient.patch(`${this._urlBack}/bovin/cow/${cowLoopnumber}/pasture`, pastureId);
  }
  removeFromPasture(cowLoopnumber: string): Observable<any> {
    return this._httpClient.delete(`${this._urlBack}/bovin/cow/${cowLoopnumber}`);
  }
  assignBull(pastureId: number, bullLoopnumber: string): Observable<any> {
    return this._httpClient.patch(`${this._urlBack}/bovin/bull/${bullLoopnumber}/pasture`, pastureId);
  }

}
