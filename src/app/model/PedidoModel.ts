import { AbstractEntity } from "./AbstractEntity"
import { Cheque } from "./Cheque"
import { Destino } from "./Destino"
import { FormaPagamento } from "./FormaPagamento"
import { HistoricoModel } from "./HistoricoModel"
import { PessoaModel } from "./PessoaModel"
import { Situacao } from "./Situacao"
export class PedidoModel extends AbstractEntity {
    cliente!:PessoaModel
    formaPaga!:FormaPagamento
    valorDoc!:Number
    juros!:Number
    amortizacao!:Number
    quantidade!:Number
    total!: Number
    cheques!:Cheque[] 

    situacao!:Situacao
    observacao!:String
    aprovacao!:boolean
    
    parcelas!:HistoricoModel[]
    
}