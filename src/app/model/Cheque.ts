import { AbstractEntity } from "./AbstractEntity";
export class Cheque extends AbstractEntity{
    numero!:String;
    codBanco!:String;
    agencia!:String;
    vencimento!:Date;
}

