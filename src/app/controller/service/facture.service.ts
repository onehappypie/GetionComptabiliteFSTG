import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FactureVo} from "../model/factureVo.model";

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private _facture:FactureVo;
  private _societe:string;
  private _factures:Array<FactureVo>;
  private _newFac:boolean;



  get newFac(): boolean {
    return this._newFac;
  }

  set newFac(value: boolean) {
    this._newFac = value;
  }

  get factures(): Array<FactureVo> {
    if (this._factures==null)this._factures=new Array<FactureVo>();
    return this._factures;
  }

  set factures(value: Array<FactureVo>) {
    this._factures = value;
  }

  get societe(): string {
    return this._societe;
  }

  set societe(value: string) {
    this._societe = value;
  }



  get facture(): FactureVo {
    if (this._facture==null) this._facture=new FactureVo();
    return this._facture;
  }

  set facture(value: FactureVo) {
    this._facture = value;
  }

  constructor(private http:HttpClient) { }

  public saveWithOperationComptable(){

    this.http.post("http://localhost:8090/accountingProject/Facture/saveWithOperations/",this.facture).subscribe(value =>{
      if (value!=null){
        this.facture=null;
      }
    } ,error => console.log("erreur"))

  }

  public findByRefSociete(){
    this.http.get<Array<FactureVo>>("http://localhost:8090/accountingProject/Facture/findByRefSociete/"+this.societe).subscribe(
      value => {

        this.factures=value;
      }
    )
  }
  public delete(){
    this.http.delete("http://localhost:8090/accountingProject/Facture/DelFacWithOp/"+this.facture.id).subscribe(
      value => {
          this.facture=null;
          this.findByRefSociete();
      }
    )
  }

  public async findByRefAndRefSoc() {
     await this.http.get<FactureVo>("http://localhost:8090/accountingProject/Facture/findByRefAndRefSociete/" + this.facture.referenceSociete + "/" + this.facture.reference).toPromise().then(
      value => {
        if (value != null) {
          this.facture = value;
          this.newFac = false;
          console.log(this.facture.operationComptablesVo);
        } else {
          let societe=this.facture.referenceSociete;
          let ref=this.facture.reference;
          this.facture=new FactureVo();
          this.facture.referenceSociete=societe;
          this.facture.reference=ref;
          this.newFac = true;
        }
      }
    );
  }
  public calculateSum(){
    this.facture.totalDebit=0;
    this.facture.totalCredit=0;
    this.facture.operationComptablesVo.forEach(
      value => {
        if (value.typeOperationComptableVo.libelle=='Debit'){
          this.facture.totalDebit+= +value.montant;
        }
        else if (value.typeOperationComptableVo.libelle=='Credit'){
          this.facture.totalCredit+= +value.montant;
        }
      }
    )
  }
}
