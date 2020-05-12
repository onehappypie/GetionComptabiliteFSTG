import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TypePaiementVo} from "../model/type-paiement-vo.model";
import {SelectItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class TypePaiementService {
  private _typePaiements:Array<TypePaiementVo>;
  private _typePaiement:TypePaiementVo;
  private _typepaiementsSelect: SelectItem[]=[];


  get typePaiements(): Array<TypePaiementVo> {
    return this._typePaiements;
  }

  set typePaiements(value: Array<TypePaiementVo>) {
    this._typePaiements = value;
  }

  get typePaiement(): TypePaiementVo {
    return this._typePaiement;
  }

  set typePaiement(value: TypePaiementVo) {
    this._typePaiement = value;
  }

  get typepaiementsSelect(): SelectItem[] {
    return this._typepaiementsSelect;
  }

  set typepaiementsSelect(value: SelectItem[]) {
    this._typepaiementsSelect = value;
  }

  constructor(private http : HttpClient) { }

  public findAll(){
    this.http.get<Array<TypePaiementVo>>("http://localhost:8090/accountingProject/TypePaiement/").subscribe(
      value => {
        this.typePaiements=value;
        this.typePaiements.forEach(item => this.typepaiementsSelect.push({label:item.libelle,value:item}))
      }
    )

  }
}
