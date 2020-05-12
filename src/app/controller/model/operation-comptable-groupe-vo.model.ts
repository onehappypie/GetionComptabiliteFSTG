import {OperationComptableVo} from "./operation-comptable-vo.model";

export class OperationComptableGroupeVo {
   id :number;
   libelle :string;
   code :string;
  operationComptablesVo:Array<OperationComptableVo>;
}
