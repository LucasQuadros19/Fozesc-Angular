import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Bancos } from 'src/app/model/Bancos';
import { BancoserviceService } from 'src/Service/banco/bancoservice.service';

@Component({
  selector: 'app-tabela-banco',
  templateUrl: './tabela-banco.component.html',
  styleUrls: ['./tabela-banco.component.scss'],
})
export class TabelaBancoComponent {
  lista: Bancos[] = [];

  @Output() retorno = new EventEmitter<Bancos>();
  @Input() modoLancamento: boolean = false;

  objetoSelecionadoParaEdicao: Bancos = new Bancos();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  Service = inject(BancoserviceService);

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
    this.objetoSelecionadoParaEdicao = new Bancos();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal: any, produto: Bancos, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditarProduto(produto: Bancos) {
  

    this.listAll();

    this.modalService.dismissAll();
  }

  lancamento(produto: Bancos) {
    this.retorno.emit(produto);
  }
}
