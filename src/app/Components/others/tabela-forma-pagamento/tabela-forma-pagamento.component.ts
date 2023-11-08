import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import {FormaPagamentoService} from 'src/Service/FormaPagamento/forma-pagamento.service';

@Component({
  selector: 'app-tabela-forma-pagamento',
  templateUrl: './tabela-forma-pagamento.component.html',
  styleUrls: ['./tabela-forma-pagamento.component.scss']
})
export class TabelaFormaPagamentoComponent {

  lista: FormaPagamento[] = [];

  @Output() retorno = new EventEmitter<FormaPagamento>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: FormaPagamento = new FormaPagamento();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  Service = inject(FormaPagamentoService);

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
    this.objetoSelecionadoParaEdicao = new FormaPagamento();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }



  editar(modal: any, produto: FormaPagamento, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarProduto(produto: FormaPagamento) {

    this.listAll();

    this.modalService.dismissAll();
  }


  lancamento(produto: FormaPagamento){
    this.retorno.emit(produto);
  }




}
