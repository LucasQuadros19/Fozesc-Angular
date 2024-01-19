import { AbstractEntity } from "./AbstractEntity";
export class Cheque extends AbstractEntity{
    numero!:String;
    valor!:number;
    valorJuros!:Number;
    vencimento!:Date;
    
}

