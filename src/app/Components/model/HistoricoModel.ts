import { AbstractEntity } from "./AbstractEntity"
import { PedidoModel } from "./PedidoModel"
export class HistoricoModel extends AbstractEntity {
    operacao!:PedidoModel
    proxPgamaneto!:Date
}