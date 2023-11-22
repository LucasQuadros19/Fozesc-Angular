import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PedidoModel } from 'src/app/model/PedidoModel';
import { Cheque } from 'src/app/model/Cheque';
import {PedidoServiceService} from 'src/Service/pedido/pedido-service.service';


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss'],
})
export class PedidoFormComponent{
  lista: PedidoModel[] = [];
  @Input() pedido: PedidoModel = new PedidoModel();
  @Output() retorno = new EventEmitter<PedidoModel>();

  Service = inject(PedidoServiceService);

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;


  objetoSelecionadoParaEdicao: Cheque = new Cheque();
  indiceSelecionadoParaEdicao!: number;
  constructor() {
    this.listAll();
  }
  salvar() {
   

    this.Service.adicionar(this.pedido).subscribe({
      next: (pedido) => {
        console.log("teste funcionando");
        this.retorno.emit(pedido);
      },
      error: (erro) => {
        console.log("teste erro");
        console.error(erro);
      },
    });
  }


  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new Cheque();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }



  editar(modal: any, produto: Cheque, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarProduto(produto: Cheque) {

    this.listAll();

    this.modalService.dismissAll();
  }
  listAll() {

    this.Service.listar().subscribe({
      next: lista => { 
        this.lista = lista;
      },
      error: erro => { 
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

 
}




  /*
  calculoComposto(): any {
    let valorInicial: number = Number(this.pedido.valorDoc);
    let jurosInt: number = Number(this.pedido.juros);
    let quantidade: number = Number(this.pedido.quantidade);
    let jurosDecimal: number = jurosInt / 100.0;
    let resultado: number;

    if (isNaN(valorInicial) || isNaN(jurosInt) || isNaN(quantidade)) {
      console.error('Valores inválidos para cálculo.');
      return { resultado: 0, parcela: 0, quantidade: 0, juros: 0, valorInicial: 0 };
    }

    if (String(this.pedido.formaPaga) == "Cheque") {
      resultado = 0;
      console.log(valorInicial);
      valorInicial = valorInicial / quantidade;
      console.log("cada chquue" + valorInicial);
      for (let i: number = 0; i < quantidade; i++) {
        let valorCheque: number = valorInicial / ((i + 1) + jurosDecimal);
        resultado = resultado + valorCheque;
        console.log(resultado + " chuqe=" + (i + 1));
      }
    } else {
      resultado = valorInicial;
      for (let i: number = 0; i < quantidade; i++) {
        let valorJuros: number = resultado * jurosDecimal;
        resultado = resultado + valorJuros;
        console.log(resultado);
      }
    }

    let juros = resultado - valorInicial;
    let parcela = resultado / quantidade;

    return { resultado, parcela, quantidade, juros, valorInicial };
  }

  calculoSimples(): any {
    const valorInicial: number = Number(this.pedido.valorDoc);
    const jurosInt: number = Number(this.pedido.juros);
    const quantidade: number = Number(this.pedido.quantidade);
    const jurosDecimal: number = jurosInt / 100.0;
    let juros: number;

    if (isNaN(valorInicial) || isNaN(jurosInt) || isNaN(quantidade)) {
      console.error('Valores inválidos para cálculo.');
      return { parcela: 0, total: 0, quantidade: 0, valorInicial: 0, juros: 0 };
    }

    const valorJuros: number = valorInicial * jurosDecimal;
    const parcela: number = valorJuros + (valorInicial / quantidade);

    const total: number = parcela * quantidade;
    juros = total - valorInicial;

    return { parcela, total, quantidade, valorInicial, juros };
  }
  */

