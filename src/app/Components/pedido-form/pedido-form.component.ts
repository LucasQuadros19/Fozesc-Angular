import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PedidoModel } from 'src/app/model/PedidoModel';
import { PessoaModel } from 'src/app/model/PessoaModel';
import { Bancos } from 'src/app/model/Bancos';
import { Situacao } from 'src/app/model/Situacao';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import { Cheque } from 'src/app/model/Cheque';
import { HistoricoModel } from 'src/app/model/HistoricoModel';

import {HistoricoServiceService} from 'src/Service/historico/historico-service.service';
import {PedidoServiceService} from 'src/Service/pedido/pedido-service.service';
import {PessoaServiceService} from 'src/Service/pessoa/pessoa-service.service';
import {FormaPagamentoService} from 'src/Service/FormaPagamento/forma-pagamento.service';
import {BancoserviceService} from 'src/Service/banco/bancoservice.service';
import {SituacaoServiceService} from 'src/Service/situacao/situacao-service.service';


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss'],
})
export class PedidoFormComponent{
  lista: PedidoModel[] = [];
  pessoas: PessoaModel[] = [];
  listaBanco: Bancos[] = [];
  listaSituacao: Situacao[] = [];
  listarPagamento: FormaPagamento[] = [];


  @Input() pedido: PedidoModel = new PedidoModel();
  @Output() retorno = new EventEmitter<PedidoModel>();

  cheque: boolean = true;

  toggleCheque() {
    this.cheque = !this.cheque;
  }

  Service = inject(PedidoServiceService);
  pessoaService = inject(PessoaServiceService);
  situacaoService = inject(SituacaoServiceService);
  bancoService = inject(BancoserviceService);
  pagamentoService = inject(FormaPagamentoService);



  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  objetoSelecionadoParaEdicao: Cheque = new Cheque();
  indiceSelecionadoParaEdicao!: number;
  constructor() {
    this.listAll();
    this.listaPessoa();
    this.listAllPagamneto();
    this.listAllSituacao();
    this.pedido.cheques; [];// gpt
   
  
  }

  

  listAllPagamneto() {
    this.pagamentoService.listar().subscribe({
      next: (listarPagamento) => {
        console.log(listarPagamento);
        this.listarPagamento = listarPagamento;
      },
      error: (erro) => {

        console.error(erro);
      },
    });
  }


  listAllSituacao() {
    this.situacaoService.listar().subscribe({
      next: (listaSituacao) => {
        console.log(listaSituacao);
        
        this.listaSituacao = listaSituacao;
      },
      error: (erro) => {

        console.error(erro);
      },
    });
  }


  listaPessoa() {
    this.pessoaService.listar().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
      },
      error: (erro) => {

        console.error(erro);
      },
    });
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

  atualizarParcelas() {
    this.pedido.parcelas = [];
    const valorParcela = Number(this.pedido.valorDoc) / Number(this.pedido.quantidade);

    for (let i = 0; i < Number(this.pedido.quantidade); i++) {
      let parcela = new HistoricoModel();
      let data = new Date();
      data.setMonth(data.getMonth() + i + 1);
      parcela.proxPgamaneto = data;
      parcela.valor = valorParcela;
      this.pedido.parcelas.push(parcela);
      console.log(parcela);
    } 
  }
  


  addOuEditarProduto(cheque: Cheque) {
    if (!this.pedido.cheques) {
      this.pedido.cheques = []; // Inicializa cheques como um array vazio, se for undefined
    }
  
    this.pedido.cheques.push(cheque);
    this.modalRef.dismiss();
  }


  listAll() {

    this.Service.listar().subscribe({
      next: lista => { 
        this.lista = lista;
      },
      error: erro => { 
       
        console.error(erro);
      }
    });

  }

  preencherDados(): void {

      this.pedido.juros = this.pedido.cliente.juros;
      this.pedido.situacao = this.pedido.cliente.situacao; 
      console.log("pessoa"+this.pedido.cliente.situacao.situacao);
      console.log("pedido"+this.pedido.situacao.situacao);
   
  }

  byId(item1: any, item2: any) {
    return item1 && item2 && item1.id === item2.id;
  }
  

  adicionarcliente(pessoa: PessoaModel) {
    this.pedido.cliente = pessoa;
  }

  adicionarSituacao(situacao: Situacao) {
    this.pedido.situacao = situacao;
  }

  adicionarPagamento(formaPaga: FormaPagamento) {
    this.pedido.formaPaga = formaPaga;
  }


 
}
