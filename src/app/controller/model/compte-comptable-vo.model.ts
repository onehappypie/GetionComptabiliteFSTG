import {SousClasseComptableVo} from "./sous-classe-comptable-vo.model";

export class CompteComptableVo {
  id:number;
  code:string;
  libelle:String;
  sousClasseComptableVo:SousClasseComptableVo;
}
