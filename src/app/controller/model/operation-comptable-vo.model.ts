import {CompteComptableVo} from "./compte-comptable-vo.model";
import {FactureVo} from "./factureVo.model";
import {CaisseVo} from "./caisse-vo.model";
import {TypeOperationComptableVo} from "./type-operation-comptable-vo.model";
import {CompteBanquaireVo} from "./compte-banquaire-vo.model";
import {OperationComptableGroupeVo} from "./operation-comptable-groupe-vo.model";

export class OperationComptableVo {
  id: number;
  libelle: string;
  referenceSociete: string;
  referenceFacture: string;
  montant: number;
  montantMin: number;
  montantMax: number;
  dateOperationComptable: Date;
  dateOperationComptableMin: Date;
  dateOperationComptableMax: Date;
  dateSaisie: Date;
  dateSaisieMin: Date;
  dateSaisieMax: Date;
  caisseVo: CaisseVo;
  typeOperationComptableVo: TypeOperationComptableVo;
  compteBanquaireVo: CompteBanquaireVo;
  compteComptableVo: CompteComptableVo;
  operationComptableGroupeVo: OperationComptableGroupeVo;
  factureVo: FactureVo;

  constructor(libelle: string, referenceSociete: string, referenceFacture: string, montant: number, dateOperationComptable: Date, dateSaisie: Date) {
    this.libelle = libelle;
    this.referenceSociete = referenceSociete;
    this.referenceFacture = referenceFacture;
    this.montant = montant;
    this.dateOperationComptable = dateOperationComptable;
    this.dateSaisie = dateSaisie;
  }
}

