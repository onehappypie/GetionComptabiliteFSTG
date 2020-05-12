import {FactureClientVo} from "./facture-client-vo.model";

export class ClientVo {
  id :number;
  ice :string;
  identifiantFiscale:string ;
  rc :string;
  libelle:string ;
  code:string ;
  factureClientsVo:Array<FactureClientVo>;
}
