import {OperationComptableVo} from "./operation-comptable-vo.model";

export class CaisseVo {
   id : number ;
   libelle :string;
   code :string;
   solde: number;
   soldeMin : number;
   soldeMax : number;
   operationComptablesVo: Array<OperationComptableVo>;

  constructor(libelle: string) {
    this.libelle = libelle;
  }
}
