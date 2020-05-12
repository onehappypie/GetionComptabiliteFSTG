import { Injectable } from '@angular/core';
import {ClientVo} from "../model/client-vo.model";
import {SelectItem} from "primeng/api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _clients:Array<ClientVo>;
  private _client:ClientVo;
  private _clientSelect:SelectItem[];


  get clients(): Array<ClientVo> {
    return this._clients;
  }

  set clients(value: Array<ClientVo>) {
    this._clients = value;
  }

  get client(): ClientVo {
    return this._client;
  }

  set client(value: ClientVo) {
    this._client = value;
  }

  get clientSelect(): SelectItem[] {
    return this._clientSelect;
  }

  set clientSelect(value: SelectItem[]) {
    this._clientSelect = value;
  }

  constructor(private http:HttpClient) { }

  public findAll(){
    this.http.get<Array<ClientVo>>("http://localhost:8090/accountingProject/Client/").toPromise().then(
      value => {
        this.clients=value;
        this.clientSelect=[];
        this.clients.forEach(item => this.clientSelect.push({label:item.libelle,value:item}))
      }
    )
  }

}
