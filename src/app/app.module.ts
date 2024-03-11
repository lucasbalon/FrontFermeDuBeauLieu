import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import { PasturesComponent } from './components/pastures/pastures.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import { BirthComponent } from './components/birth/birth.component';
import { ScanComponent } from './components/scan/scan.component';
import { InjectionComponent } from './components/injection/injection.component';
import { BovinComponent } from './components/bovin/bovin.component';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import { PastureComponent } from './components/pasture/pasture.component';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";
import { AddProductComponent } from './components/add-product/add-product.component';
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import { SaleComponent } from './components/sale/sale.component';
import {ErrorCatchingInterceptor} from "./interceptors/error-catching.interceptor";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent,
    PasturesComponent,
    BirthComponent,
    ScanComponent,
    InjectionComponent,
    BovinComponent,
    PastureComponent,
    AddProductComponent,
    SaleComponent
  ],
  imports: [
    //Angular Material
    MatInputModule,
    MatButtonModule,
    //end Angular Material

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatToolbar,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardModule,
    CdkDropList,
    CdkDrag,
    MatCheckbox,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    MatAutocomplete,
    MatAutocompleteModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionModule,
    MatSortHeader,
    MatSort,
    MatSortModule,
    MatTableModule

  ],
  providers: [
    { provide : "urlBackEnd", useValue : "http://localhost:8080"},
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
