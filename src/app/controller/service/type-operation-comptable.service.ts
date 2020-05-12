import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TypeOperationComptableVo} from "../model/type-operation-comptable-vo.model";
import {SelectItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class TypeOperationComptableService {
  private _typeOperations:Array<TypeOperationComptableVo>;
  private _typeOpSelect:SelectItem[]=[];

  get typeOpSelect(): SelectItem[] {
    return this._typeOpSelect;
  }

  set typeOpSelect(value: SelectItem[]) {
    this._typeOpSelect = value;
  }


  get typeOperations(): Array<TypeOperationComptableVo> {
    return this._typeOperations;
  }

  set typeOperations(value: Array<TypeOperationComptableVo>) {
    this._typeOperations = value;
  }

  constructor(private http:HttpClient) { }
  public findAll(){
    this.http.get<Array<TypeOperationComptableVo>>("http://localhost:8090/accountingProject/TypeOperationComptable/").subscribe(
      value => {
        this.typeOperations=value;
        this.typeOperations.forEach(item => this.typeOpSelect.push({label:item.libelle,value:item}))
      }
    )
  }
}
