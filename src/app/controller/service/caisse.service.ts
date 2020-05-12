import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CaisseVo} from "../model/caisse-vo.model";
import {SelectItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  private _caisses:Array<CaisseVo>=new Array<CaisseVo>();
  private _caisse: CaisseVo;
  private _selectCaisses: SelectItem[]=[];


  get caisse(): CaisseVo {
    return this._caisse;
  }

  set caisse(value: CaisseVo) {
    this._caisse = value;
  }

  get selectCaisses(): SelectItem[] {
    return this._selectCaisses;
  }

  set selectCaisses(value: SelectItem[]) {
    this._selectCaisses = value;
  }

  get caisses(): Array<CaisseVo> {
    return this._caisses;
  }

  set caisses(value: Array<CaisseVo>) {
    this._caisses = value;
  }

  constructor(private http:HttpClient) { }

  public findAll(){
    this.http.get<Array<CaisseVo>>("http://localhost:8090/accountingProject/Caisse/").subscribe(
      value => {
        this.caisses=value;
        this.caisses.forEach(item => this.selectCaisses.push({label:item.libelle,value:item}))

      }
    )
  }
}
