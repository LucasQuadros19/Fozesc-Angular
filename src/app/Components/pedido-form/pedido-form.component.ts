import { Component, OnInit, inject } from '@angular/core';
import PedidoClient from '../client/PedidoClient';
import { PedidoModel } from '../model/PedidoModel';
import { HistoricoModel } from '../model/HistoricoModel';
import HistoricoClient from '../client/HistoricoClient';
import PessoaClient from '../client/PessoaClient';
import { Forma } from '../model/Forma';
import { Destino } from '../model/Destino';
import { Situacao } from '../model/Situacao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  roteador = inject()

  pedido: PedidoModel = new PedidoModel();
  PessoaList: any[] = [];
  formas: string[] = Object.values(Forma);
  mensagem = {
    ativo: false,
    titulo: "",
    mensagem: "",
    css: ""
  };
  disabled = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.findById(Number(this.id));
    }
    this.ListarPessoa();
  }

  get id(): number | undefined {
    return Number(this.route.snapshot.queryParamMap.get('id'));
  }

  get form(): string | undefined {
    const formQueryParam = this.route.snapshot.queryParamMap.get('form');
    return formQueryParam !== null ? formQueryParam : undefined;
  }
  


  onClickCadastrarComposto(): void {
    this.pedido.parcelas = []; 

    for (let i = 0; i < Number(this.pedido.quantidade); i++) {
      const parcela = new HistoricoModel();
      const data = new Date();
      data.setMonth(data.getMonth() + i + 1);
      parcela.proxPgamaneto = data;
    

      this.pedido.parcelas.push(parcela);
      console.log(parcela);
    }

    PedidoClient.cadastrarComposto(this.pedido)
      .then(retorno => {
        this.pedido = retorno;
        this.mensagem.ativo = true;
        this.mensagem.mensagem = "sucesso";
        this.mensagem.titulo = "Parabéns. ";
        this.mensagem.css = "alert alert-success alert-dismissible fade show";
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error.data;
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  }

  onClickCadastrarSimples(): void {
    this.pedido.parcelas = [];

    for (let i = 0; i < Number(this.pedido.quantidade); i++) {
      const parcela = new HistoricoModel();
      const data = new Date();
      data.setMonth(data.getMonth() + i + 1);
      parcela.proxPgamaneto = data;

      parcela.operacao = this.pedido; 
    
      this.pedido.parcelas.push(parcela);
      console.log(parcela);
    }
    

    PedidoClient.cadastroSimples(this.pedido)
      .then(success => {
        this.pedido = new PedidoModel();
        this.mensagem.ativo = true;
        this.mensagem.mensagem = "sucesso";
        this.mensagem.titulo = "Parabéns. ";
        this.mensagem.css = "alert alert-success alert-dismissible fade show";
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error.data;
        this.mensagem.titulo = "Erro. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  }

  onClickCadastrarDiario(): void {
    PedidoClient.cadastroDiario(this.pedido)
      .then(success => {
        this.pedido = new PedidoModel();
        this.mensagem.ativo = true;
        this.mensagem.mensagem = success;
        this.mensagem.titulo = "Parabéns. ";
        this.mensagem.css = "alert alert-success alert-dismissible fade show";
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error.data;
        this.mensagem.titulo = "Erro. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  }

  onClickCadastrar(): void {
    PedidoClient.cadastrarComposto(this.pedido)
      .then(success => {
        this.pedido = new PedidoModel();
        this.mensagem.ativo = true;
        this.mensagem.titulo = "Parabéns. ";
        this.mensagem.css = "alert alert-success alert-dismissible fade show";
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error.data;
        this.mensagem.titulo = "Erro. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  }

  findById(id: number): void {
    PedidoClient.findById(id)
      .then(success => {
        this.pedido = success;
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error;
        this.mensagem.titulo = "Erro. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  }

  onClickEditar(): void {
    if (this.pedido.id) {
      PedidoClient.editar(this.pedido.id, this.pedido)
        .then(success => {
          this.pedido = new PedidoModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = "Parabéns. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    } else {
      console.error("ID da pedido indefinido. Não é possível editar.");
    }
  }

  onClickExcluir(): void {
    if (this.pedido.id) {
      PedidoClient.excluir(this.pedido.id)
        .then(success => {
          this.pedido = new PedidoModel();
          // this.$router.push({ name: 'pedido-lista-view' });
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    } else {
      console.error("ID da pedido indefinido. Não é possível excluir.");
    }
  }

  ListarPessoa(): void {
    PessoaClient.listaAll()
      .then(success => {
        this.PessoaList = success;
      })
      .catch(error => {
        console.log(error);
      });
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
}
