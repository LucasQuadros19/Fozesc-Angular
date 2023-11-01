import { AbstractEntity } from "./AbstractEntity"
import { Destino } from "./Destino"
import { Forma } from "./Forma"
import { HistoricoModel } from "./HistoricoModel"
import { PessoaModel } from "./PessoaModel"
import { Situacao } from "./Situacao"
export class PedidoModel extends AbstractEntity {
    cliente!:PessoaModel
    formaPaga!:Forma
    valorDoc!:Number
    juros!:Number
    valorLiquido!:Number
    quantidade!:Number
    total!: Number
    emitente!:String
    criacao!:Date
    vencimento!:Date
    destino!:Destino
    situacao!:Situacao
    observacao!:String
    aprovacao!:boolean
    parcelas!:HistoricoModel[]
}