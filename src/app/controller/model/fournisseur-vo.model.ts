import {FactureFournisseurVo} from "./facture-fournisseur-vo.model";

export class FournisseurVo {
  id :number;
  ice :string;
  identifiantFiscale:string ;
  rc :string;
  libelle :string;
  code:string ;
  factureFournisseursVo:Array<FactureFournisseurVo>;
}
