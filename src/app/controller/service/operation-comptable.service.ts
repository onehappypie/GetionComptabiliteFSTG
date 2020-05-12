import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OperationComptableVo} from "../model/operation-comptable-vo.model";

@Injectable({
  providedIn: 'root'
})
export class OperationComptableService {
  private _operationComptable:OperationComptableVo;
  private _operationsComptable:Array<OperationComptableVo>;


  get operationsComptable(): Array<OperationComptableVo> {
    if (this._operationsComptable==null) this._operationsComptable=new Array<OperationComptableVo>();
    return this._operationsComptable;
  }

  set operationsComptable(value: Array<OperationComptableVo>) {
    this._operationsComptable = value;
  }

  get operationComptable(): OperationComptableVo {
    return this._operationComptable;
  }

  set operationComptable(value: OperationComptableVo) {
    this._operationComptable = value;
  }

  constructor(private http:HttpClient) { }

  public deleteAll(){
    if (this.operationsComptable.length!=0){
    this.operationsComptable.forEach(
      value => {
        console.log(value.id);
        this.http.delete("http://localhost:8090/accountingProject/OperationComptable/delete/"+value.id).toPromise().then(value1 => this.operationsComptable=null);
      }
    )
    }
  }

}
