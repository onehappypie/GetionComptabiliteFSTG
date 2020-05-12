import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CpcGenerateComponent } from './pages/cpc-generate/cpc-generate.component';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import { FactureSaveComponent } from './pages/facture-save/facture-save.component';
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import { FactureListComponent } from './pages/facture-list/facture-list.component';
import {FactureService} from "./controller/service/facture.service";
import { FactureFournisseurComponent } from './pages/facture-save/facture-fournisseur/facture-fournisseur.component';
import { FactureClientComponent } from './pages/facture-save/facture-client/facture-client.component';


@NgModule({
  declarations: [
    AppComponent,
    CpcGenerateComponent,
    FactureSaveComponent,
    FactureListComponent,
    FactureFournisseurComponent,
    FactureClientComponent,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    DialogModule
  ],
  providers: [MessageService,FactureService],

  bootstrap: [AppComponent]
})
export class AppModule { }
