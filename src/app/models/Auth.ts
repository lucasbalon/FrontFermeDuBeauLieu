import {Validators} from "@angular/forms";

export const LOGIN_FORM = {
  login: ['', [Validators.required]],
  password: ['', [Validators.required]]
}

export interface Auth {
  login: string,
  token: string
}
