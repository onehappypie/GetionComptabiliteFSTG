import {PaiementFacturesVo} from "./paiement-factures-vo.model";

export class TypePaiementVo {
  id :number;
  libelle :string;
  code :string;
  paiementFacturesVo:Array<PaiementFacturesVo>;
}
