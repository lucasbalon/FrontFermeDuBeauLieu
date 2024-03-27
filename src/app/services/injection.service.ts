import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {InjectionForm} from "../models/Injection";

@Injectable({
  providedIn: 'root'
})
export class InjectionService {

  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) {
  }

  create(injectionForm: InjectionForm): Observable<any> {
    return this._httpClient.post(`${this._urlBack}/injection`, injectionForm);
  }
}
