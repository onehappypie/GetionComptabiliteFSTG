import {FactureVo} from "./factureVo.model";

export class FactureItemsVo {
  id : number ;
  produit:string;
  montant:number;
  montantMin:number ;
  montantMax:number ;
  quantite:number;
  quantiteMin :number;
  quantiteMax :number;
  factureVo :FactureVo;
}
