import {ClasseComptableVo} from "./classe-comptable-vo.model";

export class SousClasseComptableVo {
  id:number;
  numero:number;
  numeroMin:number;
  numeroMax:number;
  libelle:string;
  classeComptableVo:ClasseComptableVo;
  sousClasseComptablesVo:Array<SousClasseComptableVo>;

}
