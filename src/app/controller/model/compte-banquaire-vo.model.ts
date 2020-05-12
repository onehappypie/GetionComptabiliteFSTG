import {BanqueVo} from "./banque-vo.model";
import {OperationComptableVo} from "./operation-comptable-vo.model";

export class CompteBanquaireVo {
   id :number;
   libelle:string ;
   code :string;
   solde:number;
   soldeMin :number;
   soldeMax :number;
   banqueVo:BanqueVo ;
   operationComptablesVo:Array<OperationComptableVo>;

  constructor(libelle: string) {
    this.libelle = libelle;
  }
}
