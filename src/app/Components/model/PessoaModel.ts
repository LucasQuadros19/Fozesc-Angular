import { AbstractEntity } from "./AbstractEntity"
import { Bancos } from "./Bancos"
import { Situacao } from "./Situacao"
export class PessoaModel extends AbstractEntity {
    nome!:String
    cpf!:String
    rg!:String
    numeroDoc!:String
    banco!:Bancos
    situacao!:Situacao
    limite!:Number
    cep!:String
    cidade!:String
    bairro!:String
    rua!:String
    numero!:Number
    taxa!:Number;
}