import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PedidoModel } from 'src/app/model/PedidoModel';
import { PessoaModel } from 'src/app/model/PessoaModel';
import { Bancos } from 'src/app/model/Bancos';
import { Situacao } from 'src/app/model/Situacao';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import { Cheque } from 'src/app/model/Cheque';
import { HistoricoModel } from 'src/app/model/HistoricoModel';

import { HistoricoServiceService } from 'src/Service/historico/historico-service.service';
import { PedidoServiceService } from 'src/Service/pedido/pedido-service.service';
import { PessoaServiceService } from 'src/Service/pessoa/pessoa-service.service';
import { FormaPagamentoService } from 'src/Service/FormaPagamento/forma-pagamento.service';
import { BancoserviceService } from 'src/Service/banco/bancoservice.service';
import { SituacaoServiceService } from 'src/Service/situacao/situacao-service.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss'],
})
export class PedidoFormComponent implements OnChanges {
  lista: PedidoModel[] = [];
  pessoas: PessoaModel[] = [];
  listaBanco: Bancos[] = [];
  listaSituacao: Situacao[] = [];
  listarPagamento: FormaPagamento[] = [];
  somaValores: number = 0;
  somaComJuros: number = 0;
  mostrarAlerta = false;
  cheque: boolean = true;

  @Input() pedido: PedidoModel = new PedidoModel();
  @Output() retorno = new EventEmitter<PedidoModel>();

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
    this.pedido.cheques;

    this.convertToDate;
    this.calculoValor(this.pedido.cheques);
    this.calculoJuros(this.pedido.cheques);
    this.formatarNumero;
    this.verificarValorDoc;

  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('pedido' in changes) {
      this.atualizarSomaComJuros();
    }
  }

  verificarValorDoc() {
    this.mostrarAlerta =
      Number(this.pedido.valorDoc) > Number(this.pedido.cliente.limite);
  }
  atualizarSomaComJuros(): void {
    this.somaComJuros = this.calculoJuros(this.pedido.cheques);
  }

  calculoJuros(cheques: Cheque[] | null | undefined): number {
    if (!cheques || !Array.isArray(cheques)) {
      return 0;
    }
    let soma = 0;
    for (const cheque of cheques) {
      soma += Number(cheque.valorJuros) || 0;
    }
    return soma;
  }

  formatarNumero(valor: number | null | undefined): string {
    return valor != null ? valor.toFixed(2) : 'N/A';
  }

  calculoValor(cheques: Cheque[] | null | undefined): number {
    if (!cheques || !Array.isArray(cheques)) {
      return 0;
    }
    let soma = 0;
    for (const cheque of cheques) {
      soma += Number(cheque.valor) || 0;
    }
    return soma;
  }

  atualizarParcelas() {
    this.pedido.parcelas = [];
    const valorParcela =
      Number(this.pedido.valorDoc) / Number(this.pedido.quantidade);
    for (let i = 0; i < Number(this.pedido.quantidade); i++) {
      let parcela = new HistoricoModel();
      let data = new Date();
      data.setMonth(data.getMonth() + i + 1);
      parcela.proxPgamaneto = data;
      parcela.valor = valorParcela;
      this.pedido.parcelas.push(parcela);
    }
  }

  addOuEditarProduto(cheque: Cheque) {
    if (!this.pedido.cheques) {
      this.pedido.cheques = [];
    }

    if (!this.pedido.juros) {
      console.error('Erro: Pedido sem valor de juros.');
      return;
    }
    const vencimentoOriginal = cheque.vencimento;

    cheque.vencimento = this.convertToDate(cheque.vencimento);

    const hoje = new Date();

    const diffDias = Math.ceil(
      (cheque.vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );
    //ordem excel
    let totalMes = diffDias / 30;
    const jurosDiarios = (Number(this.pedido.juros) || 0) / 100;
    let cJuros = Number(cheque.valor) * Math.pow(1 + jurosDiarios, totalMes);
    cheque.valorJuros = cJuros - (Number(cheque.valor) || 0);
    cheque.vencimento = vencimentoOriginal;

    this.pedido.cheques.push(cheque);

    this.modalRef.dismiss();
  }

  convertToDate(value: string | number | Date): Date {
    if (value instanceof Date) {
      return value;
    } else if (typeof value === 'string') {
      // "DDMMYYYY"
      const day = Number(value.substr(0, 2));
      const month = Number(value.substr(2, 2)) - 1;
      const year = Number(value.substr(4, 4));

      return new Date(year, month, day);
    } else if (typeof value === 'number') {
      return new Date(value);
    } else {
      return new Date();
    }
  }


  // api
  listAll() {
    this.Service.listar().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }

  preencherDados(): void {
    this.pedido.juros = this.pedido.cliente.juros;
    this.pedido.situacao = this.pedido.cliente.situacao;
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
    if (this.mostrarAlerta) {
      console.log('nao da pra salvar');
      return;
    }
    this.Service.adicionar(this.pedido).subscribe({
      next: (pedido) => {
        this.retorno.emit(pedido);
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }
  adicionar(modal: any) {
    if (!this.pedido.juros) {
      console.error('Erro: Pedido sem valor de juros.');
      return;
    }

    this.objetoSelecionadoParaEdicao = new Cheque();
    this.indiceSelecionadoParaEdicao = -1;
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal: any, produto: Cheque, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
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
