import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {CpcCompteComptableServiceService} from "../../controller/service/cpc-compte-comptable-service.service";
import {CpcCompteComptableVo} from "../../controller/model/cpc-compte-comptable-vo.model";

@Component({
  selector: 'app-cpc-generate',
  templateUrl: './cpc-generate.component.html',
  styleUrls: ['./cpc-generate.component.css']
})
export class CpcGenerateComponent implements OnInit {
  rangeDates: Date[];
  societe:string;
  societesList: string[]=['bmce','fstg','soc3'];
  filtredSoc : string[];
  showed:boolean=false;
  rowGroupMetadata: {};
  today: Date=new Date();
  totalCharges:number=0;
  totalProduits:number=0;

  constructor(private messageService:MessageService,private cpcCompteComptableService:CpcCompteComptableServiceService) { }

  ngOnInit(): void {

  }
  get cpcSousclasse7(): Array<CpcCompteComptableVo> {
    return this.cpcCompteComptableService.cpcCompteComptableSousclasse7;
  }
  get cpcSousclasse6(): Array<CpcCompteComptableVo> {
    return this.cpcCompteComptableService.cpcCompteComptableSousclasse6;
  }



  filterSoc(event) {
    this.filtredSoc = [];
    for(let i = 0; i < this.societesList.length; i++) {
      let societe = this.societesList[i];
      if(societe.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filtredSoc.push(societe);
      }
    }
  }

  generate() {
      if (this.societe==null || this.rangeDates.length<2){
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
      }else {
        this.cpcCompteComptableService.generateCpc();
        this.showed=true
      }
  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.cpcSousclasse6) {
      for (let i = 0; i < this.cpcSousclasse6.length; i++) {
        let rowData = this.cpcSousclasse6[i];
        let sousClasse = rowData.compteComptableVo.code;
        this.totalCharges+=parseFloat(String(rowData.montant));
        if (i == 0) {
          this.rowGroupMetadata[sousClasse] = { index: 0, size: 1,total:parseFloat(String(rowData.montant)) };
        }
        else {
          let previousRowData = this.cpcSousclasse6[i - 1];
          let previousRowGroup = previousRowData.compteComptableVo.code;
          if (sousClasse === previousRowGroup){
            this.rowGroupMetadata[sousClasse].size++;
          this.rowGroupMetadata[sousClasse].total= parseFloat(this.rowGroupMetadata[sousClasse].total)+parseFloat(String(rowData.montant));}
          else
            this.rowGroupMetadata[sousClasse] = { index: i, size: 1, total:parseFloat(String(rowData.montant)) };
        }
      }
    }
    if (this.cpcSousclasse7) {
      if (this.totalProduits==0) this.cpcSousclasse7.forEach(value => this.totalProduits+=parseFloat(String(value.montant)));
      for (let i = 0; i < this.cpcSousclasse7.length; i++) {
        let rowData = this.cpcSousclasse7[i];
        let sousClasse = rowData.compteComptableVo.code;
        if (i == 0) {
          this.rowGroupMetadata[sousClasse] = { index: 0, size: 1,total:parseFloat(String(rowData.montant)) };
        }
        else {
          let previousRowData = this.cpcSousclasse7[i - 1];
          let previousRowGroup = previousRowData.compteComptableVo.code;
          if (sousClasse === previousRowGroup){
            this.rowGroupMetadata[sousClasse].size++;
            this.rowGroupMetadata[sousClasse].total= parseFloat(this.rowGroupMetadata[sousClasse].total)+parseFloat(String(rowData.montant));}
          else
            this.rowGroupMetadata[sousClasse] = { index: i, size: 1, total:parseFloat(String(rowData.montant)) };
        }
      }
    }
  }

  onSort(){
    this.updateRowGroupMetaData()
  }


}
