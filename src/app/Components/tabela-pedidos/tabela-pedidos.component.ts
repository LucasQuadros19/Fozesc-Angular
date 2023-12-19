import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PedidoModel } from 'src/app/model/PedidoModel';
import { PedidoServiceService } from 'src/Service/pedido/pedido-service.service';

@Component({
  selector: 'app-tabela-pedidos',
  templateUrl: './tabela-pedidos.component.html',
  styleUrls: ['./tabela-pedidos.component.scss'],
})
export class TabelaPedidosComponent {
  lista: PedidoModel[] = [];

  @Output() retorno = new EventEmitter<PedidoModel>();
  @Input() modoLancamento: boolean = false;

  objetoSelecionadoParaEdicao: PedidoModel = new PedidoModel();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  Service = inject(PedidoServiceService);

  constructor() {
    this.listAll();
    //this.exemploErro();
  }

  listAll() {
    this.Service.listar().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert(
          'Exemplo de tratamento de erro/exception! Observe o erro no console!'
        );
        console.error(erro);
      },
    });
  }
  // MÉTODOS DA MODAL

  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new PedidoModel();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal: any, produto: PedidoModel, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarProduto(produto: PedidoModel) {
    this.listAll();

    this.modalService.dismissAll();
  }

  lancamento(produto: PedidoModel) {
    this.retorno.emit(produto);
  }
}
