import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {SearchComponent} from "./components/search/search.component";
import {PasturesComponent} from "./components/pastures/pastures.component";
import {BirthComponent} from "./components/birth/birth.component";
import {BovinComponent} from "./components/bovin/bovin.component";
import {InjectionComponent} from "./components/injection/injection.component";
import {ScanComponent} from "./components/scan/scan.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'search', component: SearchComponent, canActivate: [authGuard]},
  {path: 'pastures', component: PasturesComponent, canActivate: [authGuard]},
  {path: 'birth', component: BirthComponent, canActivate: [authGuard]},
  {path: 'bovin', component: BovinComponent, canActivate: [authGuard]},
  {path: 'injection', component: InjectionComponent, canActivate: [authGuard]},
  {path: 'scan', component: ScanComponent, canActivate: [authGuard]},
  {path:'404', component: NotFoundComponent},
  {path:'**', redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
