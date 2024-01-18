import { AbstractEntity } from "./AbstractEntity";
export class Cheque extends AbstractEntity{
    numero!:String;
    valor!:number;
    valorjuros!:Number;
    vencimento!:Date;
    
}

