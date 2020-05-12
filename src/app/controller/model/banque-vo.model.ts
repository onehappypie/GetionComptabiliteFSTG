import {CompteBanquaireVo} from "./compte-banquaire-vo.model";

export class BanqueVo {
   id:number ;
   libelle :string;
   code :string;
  compteBanquairesVo:Array<CompteBanquaireVo>;
}
