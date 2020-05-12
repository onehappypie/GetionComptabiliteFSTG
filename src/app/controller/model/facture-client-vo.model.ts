import {FactureVo} from "./factureVo.model";
import {ClientVo} from "./client-vo.model";

export class FactureClientVo extends FactureVo{
  id:number;
  clientVo:ClientVo;
}
