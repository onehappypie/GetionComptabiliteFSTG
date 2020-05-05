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
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    CpcGenerateComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
