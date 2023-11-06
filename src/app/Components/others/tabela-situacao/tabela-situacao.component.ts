import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Situacao } from 'src/app/model/Situacao';
import {SituacaoServiceService} from 'src/Service/situacao/situacao-service.service';


@Component({
  selector: 'app-tabela-situacao',
  templateUrl: './tabela-situacao.component.html',
  styleUrls: ['./tabela-situacao.component.scss']
})
export class TabelaSituacaoComponent {

  lista: Situacao[] = [];

  @Output() retorno = new EventEmitter<Situacao>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: Situacao = new Situacao();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  Service = inject(SituacaoServiceService);

  constructor() {

    this.listAll();
    //this.exemploErro();

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
  // MÉTODOS DA MODAL

  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new Situacao();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }



  editar(modal: any, produto: Situacao, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarProduto(produto: Situacao) {

    this.listAll();

    this.modalService.dismissAll();
  }


  lancamento(produto: Situacao){
    this.retorno.emit(produto);
  }




}
