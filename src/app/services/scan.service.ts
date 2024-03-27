import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ScanForm} from "../models/Scan";

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) {
  }

  create(scanForm: ScanForm): Observable<any> {
    return this._httpClient.post(`${this._urlBack}/scan`, scanForm);
  }
}
