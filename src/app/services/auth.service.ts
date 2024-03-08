import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Auth} from "../models/Auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private authStatusListener = new Subject<boolean>();
  connectedUser = new BehaviorSubject<Auth | null>(null)
  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('urlBackEnd') private readonly _urlBack: string) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(auth: Auth) {
    return this._httpClient.post<Auth>(`${this._urlBack}/user/login`, auth).pipe(
      tap( value => {
        localStorage.setItem('token', value.token);
        localStorage.setItem('login', value.login);
        this.connectedUser.next(value);
        this.loggedIn.next(true);
        this._router.navigate(['search']);
      })
    );
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('login');
    this.connectedUser.next(null);
    this.loggedIn.next(false);
    this._router.navigate(['login']);
  }


}
