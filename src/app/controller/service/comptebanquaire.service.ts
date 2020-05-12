import { Injectable } from '@angular/core';
import {CompteBanquaireVo} from "../model/compte-banquaire-vo.model";
import {HttpClient} from "@angular/common/http";
import {SelectItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ComptebanquaireService {
  private _compteBanquaires:Array<CompteBanquaireVo>;
  private _compteBanquaire: CompteBanquaireVo;
  private _selectCompteBanquaire:SelectItem[]=[];


  get compteBanquaire(): CompteBanquaireVo {
    return this._compteBanquaire;
  }

  set compteBanquaire(value: CompteBanquaireVo) {
    this._compteBanquaire = value;
  }

  get selectCompteBanquaire(): SelectItem[] {
    return this._selectCompteBanquaire;
  }

  set selectCompteBanquaire(value: SelectItem[]) {
    this._selectCompteBanquaire = value;
  }

  get compteBanquaires(): Array<CompteBanquaireVo> {
    return this._compteBanquaires;
  }

  set compteBanquaires(value: Array<CompteBanquaireVo>) {
    this._compteBanquaires = value;
  }

  constructor(private _http:HttpClient) { }

  public findAll(){
    this._http.get<Array<CompteBanquaireVo>>("http://localhost:8090/accountingProject/CompteBanquaire/").subscribe(
      value => {
            this.compteBanquaires=value;
            this.compteBanquaires.forEach(item => this.selectCompteBanquaire.push({label:item.libelle,value:item}))
      },error => console.log("error")
    );
  }
}
