import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PastureDTO} from "../models/Pasture";

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
}
