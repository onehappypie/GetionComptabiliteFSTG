import {FactureVo} from "./factureVo.model";
import {FournisseurVo} from "./fournisseur-vo.model";

export class FactureFournisseurVo extends FactureVo{
  id:number;
  fournisseur:FournisseurVo;

}
