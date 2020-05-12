import { Injectable } from '@angular/core';
import {FournisseurVo} from "../model/fournisseur-vo.model";
import {SelectItem} from "primeng/api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private _founisseur:FournisseurVo;
  private _fournisseurs:Array<FournisseurVo>;
  private _founisseurSelect:SelectItem[];


  get founisseur(): FournisseurVo {
    return this._founisseur;
  }

  set founisseur(value: FournisseurVo) {
    this._founisseur = value;
  }

  get fournisseurs(): Array<FournisseurVo> {
    return this._fournisseurs;
  }

  set fournisseurs(value: Array<FournisseurVo>) {
    this._fournisseurs = value;
  }

  get founisseurSelect(): SelectItem[] {
    return this._founisseurSelect;
  }

  set founisseurSelect(value: SelectItem[]) {
    this._founisseurSelect = value;
  }

  constructor(private http:HttpClient) { }

  public findAll(){
    this.http.get<Array<FournisseurVo>>("http://localhost:8090/accountingProject/Fournisseur/").toPromise().then(
      value => {
        this.fournisseurs=value;
        this.founisseurSelect=[];
        this.fournisseurs.forEach(item => this.founisseurSelect.push({label:item.libelle,value:item}))
      }
    )
  }
}
