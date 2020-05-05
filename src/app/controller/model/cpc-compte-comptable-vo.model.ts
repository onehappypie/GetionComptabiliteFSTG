import {CompteComptableVo} from "./compte-comptable-vo.model";
import {CpcSousClasseComptableVo} from "./cpc-sous-classe-comptable-vo.model";

export class CpcCompteComptableVo {
    id:number;
    montant:number;
    montantMin:number;
    montantMax:number;
    compteComptableVo:CompteComptableVo;
    cpcSousClasseVo:CpcSousClasseComptableVo;

}
