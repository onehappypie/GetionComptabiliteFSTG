import {Component, OnInit} from '@angular/core';
import {FactureVo} from "../../controller/model/factureVo.model";
import {FactureService} from "../../controller/service/facture.service";
import {OperationComptableVo} from "../../controller/model/operation-comptable-vo.model";

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  societesList: string[] = ['bmce', 'fstg', 'soc3'];
  filtredSoc: string[];
  showed: boolean = false;
  displayDialog: boolean;
  operations: Array<OperationComptableVo>;
  empty: boolean;

  get factures(): Array<FactureVo> {
    return this.factureService.factures;
  }

  get societe(): string {
    return this.factureService.societe;
  }

  set societe(value: string) {
    this.factureService.societe = value;
  }

  get facture(): FactureVo {
    return this.factureService.facture;
  }

  set facture(value: FactureVo) {
    this.factureService.facture = value;
  }

  constructor(private factureService: FactureService) {
  }

  ngOnInit(): void {
  }

  filterSoc(event) {
    this.filtredSoc = [];
    for (let i = 0; i < this.societesList.length; i++) {
      let societe = this.societesList[i];
      if (societe.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filtredSoc.push(societe);
      }
    }
  }

  Search() {
    if (this.societe != null) {
      this.factureService.findByRefSociete();
      this.showed = true;

    }
  }

  operationShow(rowData) {
    if (this.operations == rowData.operationComptablesVo) {
      this.displayDialog = false;
      this.operations = null;
    } else {
      this.displayDialog = true;
      this.operations = rowData.operationComptablesVo;
    }


  }

  delete(rowData) {
    this.facture = rowData;
    this.factureService.delete();
    this.operations=null;
    this.displayDialog=false;
  }
}
