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
  elemento: any;

  constructor() {
    this.listAll();
  }

  ngOnInit(): void {     
  }
  
  ngAfterViewInit(): void {
      this.elemento.nativeElement.ownerDocument.body.style.backgroundColor = 'red';
  }

  listAll() {
    this.Service.listar().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert('Erro ao carregar os dados da tabela. Por favor, tente novamente.');
        console.error(erro);
      },
    });
  }
   

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

  // Função para calcular o valor total dos pedidos
  calcularValorTotal(): number {
    let total = 0;
    for (let pedido of this.lista) {
      total += Number(pedido.valorDoc);
    }
    return total;
  }
}
