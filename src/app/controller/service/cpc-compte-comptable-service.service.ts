import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CpcCompteComptableVo} from "../model/cpc-compte-comptable-vo.model";

@Injectable({
  providedIn: 'root'
})
export class CpcCompteComptableServiceService {
  private _cpcCompteComptableSousclasse6:Array<CpcCompteComptableVo>
  private _cpcCompteComptableSousclasse7:Array<CpcCompteComptableVo>
  constructor(private _http:HttpClient) { }

  get cpcCompteComptableSousclasse6(): Array<CpcCompteComptableVo> {
    return this._cpcCompteComptableSousclasse6;
  }

  set cpcCompteComptableSousclasse6(value: Array<CpcCompteComptableVo>) {
    this._cpcCompteComptableSousclasse6 = value;
  }

  get cpcCompteComptableSousclasse7(): Array<CpcCompteComptableVo> {
    return this._cpcCompteComptableSousclasse7;
  }

  set cpcCompteComptableSousclasse7(value: Array<CpcCompteComptableVo>) {
    this._cpcCompteComptableSousclasse7 = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  public generateCpc(){
    this._http.get<Array<CpcCompteComptableVo>>("http://localhost:8090/accountingProject/CpcCompteComptable/find/7").subscribe(value =>
    {
      this.cpcCompteComptableSousclasse7=value;
    })
    this._http.get<Array<CpcCompteComptableVo>>("http://localhost:8090/accountingProject/CpcCompteComptable/find/6").subscribe(value =>
    {
      this.cpcCompteComptableSousclasse6=value;
    })
  }

}
