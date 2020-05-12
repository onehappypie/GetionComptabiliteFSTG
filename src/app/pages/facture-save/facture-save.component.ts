import { Component, OnInit } from '@angular/core';
import {FactureVo} from "../../controller/model/factureVo.model";
import {DialogService} from "primeng/dynamicdialog";
import {OperationComptableVo} from "../../controller/model/operation-comptable-vo.model";
import {MessageService, SelectItem} from "primeng/api";
import {CaisseVo} from "../../controller/model/caisse-vo.model";
import {CompteBanquaireVo} from "../../controller/model/compte-banquaire-vo.model";
import {FactureService} from "../../controller/service/facture.service";
import {ComptebanquaireService} from "../../controller/service/comptebanquaire.service";
import {CaisseService} from "../../controller/service/caisse.service";
import {TypeOperationComptableService} from "../../controller/service/type-operation-comptable.service";
import {TypePaiementVo} from "../../controller/model/type-paiement-vo.model";
import {TypePaiementService} from "../../controller/service/type-paiement.service";
import {OperationComptableService} from "../../controller/service/operation-comptable.service";

@Component({
  selector: 'app-facture-save',
  templateUrl: './facture-save.component.html',
  styleUrls: ['./facture-save.component.css'],
  providers:[DialogService]
})
export class FactureSaveComponent implements OnInit {
  societesList: string[]=['bmce','fstg','soc3'];
  filtredSoc : string[];
  selected:boolean=false;
  showed:boolean=false;
  selectedOp: OperationComptableVo;
  operation: OperationComptableVo;
  displayDialog: boolean;
  newOp: boolean;
  refreshed: boolean;

  get typePaiement(): TypePaiementVo {
    return this.typePaiementService.typePaiement;
  }

  set typePaiement(value: TypePaiementVo) {
    this.typePaiementService.typePaiement = value;
  }

  get typepaiementsSelect(): SelectItem[] {
    return this.typePaiementService.typepaiementsSelect;
  }


  get caisse(): CaisseVo {
    return this.caisseService.caisse;
  }

  set caisse(value: CaisseVo) {
    this.caisseService.caisse = value;
  }

  get compteBanquaire(): CompteBanquaireVo {
    return this.comptebanquaireService.compteBanquaire;
  }

  set compteBanquaire(value: CompteBanquaireVo) {
    this.comptebanquaireService.compteBanquaire = value;
  }

  get selectCaisses(): SelectItem[] {
    return this.caisseService.selectCaisses;
  }
  get selectCompteBanquaire(): SelectItem[] {
    return this.comptebanquaireService.selectCompteBanquaire;
  }
  get typeOpSelect(): SelectItem[] {
    return this.typeopService.typeOpSelect;
  }
  get facture(): FactureVo {

    return this.factureService.facture;
  }

  get newFac(): boolean {
    return this.factureService.newFac;
  }

  get operationComptable(): OperationComptableVo {
    return this.operationService.operationComptable;
  }

  set operationComptable(value: OperationComptableVo) {
    this.operationService.operationComptable = value;
  }
  get operationsComptable(): Array<OperationComptableVo> {
    return this.operationService.operationsComptable;
  }




  constructor(private messageService:MessageService,
              private factureService:FactureService,
              private comptebanquaireService:ComptebanquaireService,
              private caisseService:CaisseService,
              private typeopService:TypeOperationComptableService,
              private typePaiementService:TypePaiementService,
              private operationService:OperationComptableService) { }

  ngOnInit(): void {
    this.typePaiementService.findAll();
    this.caisseService.findAll();
    this.comptebanquaireService.findAll();
    this.typeopService.findAll();
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

  show() {
    let typepaiement=this.compteBanquaire? true:!!this.caisse;
    console.log(this.compteBanquaire)
    console.log(this.caisse)
    if (this.facture.reference==null || this.facture.referenceSociete==null || this.facture.totalHt==null || this.facture.tva==null || this.facture.typeFacture== null || this.facture.dateFacture==null || !typepaiement){
      this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    }else {
      this.showed=true;
    this.facture.annee=this.facture.dateFacture.getFullYear();
    this.facture.dateSaisie=new Date();
    this.facture.mois=this.facture.dateFacture.getMonth();
    this.facture.totalTtc=+this.facture.totalHt+ +this.facture.tva;
    if (this.newFac){
      this.facture.operationComptablesVo=[
        new OperationComptableVo("Achat",this.facture.referenceSociete,this.facture.reference,this.facture.totalHt,this.facture.dateFacture,new Date()),
        new OperationComptableVo("Tva",this.facture.referenceSociete,this.facture.reference,this.facture.tva,this.facture.dateFacture,new Date()),
        new OperationComptableVo(this.typePaiement.libelle=='Cheque'? 'Banque':'Caisse',this.facture.referenceSociete,this.facture.reference,this.facture.totalTtc,this.facture.dateFacture,new Date())
      ];
       this.facture.operationComptablesVo[0].typeOperationComptableVo=this.typeOpSelect[0].value;
       this.facture.operationComptablesVo[1].typeOperationComptableVo=this.typeOpSelect[0].value;
       this.facture.operationComptablesVo[2].typeOperationComptableVo=this.typeOpSelect[1].value;

    }
      this.factureService.calculateSum();
  }}
  select() {
    this.compteBanquaire=null;
    this.caisse=null;
    this.selected=true;
  }
  save(){
    this.factureService.calculateSum();
    let sum=this.facture.totalCredit- +this.facture.totalDebit;
    if  (sum==0){
      this.facture.operationComptablesVo.forEach(
        value => {
          if (value.typeOperationComptableVo.libelle=='Credit'){
            if (this.compteBanquaire!=null) {
              value.compteBanquaireVo=this.compteBanquaire;
            }

            else if (this.caisse!=null){
              value.caisseVo=this.caisse;
            }
          }
        }
      )
     this.operationService.deleteAll();
      this.factureService.saveWithOperationComptable();
      this.showed=false;
      this.refreshed=false;
      console.log(this.facture.operationComptablesVo)

    }else {
      this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    }

  }
  onRowEditInit(op: OperationComptableVo) {
    this.selectedOp=op;
    this.displayDialog=true;
    this.newOp=false;
    this.operation=this.cloneOperation(op)

  }

  saveOperation(){
    if (this.operation.libelle!=null && this.operation.montant!=null) {
      let operations = [... this.facture.operationComptablesVo];
      if (this.newOp)
        operations.push(this.operation);
      else
        operations[ this.facture.operationComptablesVo.indexOf(this.selectedOp)] = this.operation;

      this.facture.operationComptablesVo = operations;
      this.operation = null;
      this.displayDialog = false;
      this.factureService.calculateSum();

    }
  }

  showDialogToAdd() {
    this.newOp = true;
    this.operation = new OperationComptableVo(null,this.facture.referenceSociete,this.facture.reference,null,this.facture.dateFacture,new Date());
    this.displayDialog = true;
  }
  delete(index:number,rowdata:OperationComptableVo) {

      this.facture.operationComptablesVo =  this.facture.operationComptablesVo.filter((val, i) => i != index);
    if (rowdata.id!=null){
      this.operationsComptable.push(rowdata);
    }
      this.operation = null;
      this.factureService.calculateSum();


  }
  cloneOperation(op: OperationComptableVo): OperationComptableVo {
    let operation = new OperationComptableVo(null,this.facture.referenceSociete,this.facture.reference,null,this.facture.dateFacture,new Date());
    operation.id=op.id;
    operation.typeOperationComptableVo=op.typeOperationComptableVo;
    operation.libelle=op.libelle;
    operation.montant=op.montant;

    return operation;
  }

  async refresh() {
    if (this.facture.reference!=null && this.facture.referenceSociete!=null){
      await this.factureService.findByRefAndRefSoc();
      this.refreshed=true;
      if (!this.newFac){
        this.showed=true;
        this.facture.dateFacture=new Date(this.facture.dateFacture);
        this.factureService.calculateSum();
        this.facture.operationComptablesVo.forEach(
          value => {
            if (value.typeOperationComptableVo.libelle=='Credit'){
              if (value.compteBanquaireVo!=null){
                this.compteBanquaire=value.compteBanquaireVo;
              }else if (value.caisseVo!=null){
                this.caisse=value.caisseVo;
              }

            }
          }
        )
      }else{
        this.showed=false;
      }
      console.log(this.facture)
    }
  }
}
