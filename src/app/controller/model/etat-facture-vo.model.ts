import {FactureVo} from "./factureVo.model";

export class EtatFactureVo {
  id : number;
  libelle : string;
  code :string ;
  facturesVo : Array<FactureVo>;
}
