import {SousClasseComptableVo} from "./sous-classe-comptable-vo.model";

export class ClasseComptableVo {
   id :number ;
   numero:number;
   numeroMin :number;
   numeroMax :number ;
   libelle :string ;
  sousClasseComptablesVo:Array<SousClasseComptableVo>;
}
