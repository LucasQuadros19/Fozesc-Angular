import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PessoaModel } from 'src/app/model/PessoaModel';
import {PessoaServiceService} from 'src/Service/pessoa/pessoa-service.service';


@Component({
  selector: 'app-tabela-pessoas',
  templateUrl: './tabela-pessoas.component.html',
  styleUrls: ['./tabela-pessoas.component.scss']
})
export class TabelaPessoasComponent {

  lista: PessoaModel[] = [];

  @Output() retorno = new EventEmitter<PessoaModel>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: PessoaModel = new PessoaModel();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  Service = inject(PessoaServiceService);

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
    this.objetoSelecionadoParaEdicao = new PessoaModel();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }



  editar(modal: any, produto: PessoaModel, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarProduto(produto: PessoaModel) {

    this.listAll();

    this.modalService.dismissAll();
  }


  lancamento(produto: PessoaModel){
    this.retorno.emit(produto);
  }




}
