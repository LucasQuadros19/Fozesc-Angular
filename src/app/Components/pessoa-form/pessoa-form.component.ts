// pessoa-formulario.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PessoaModel } from '../model/PessoaModel';
import PessoaClient from '../client/PessoaClient';
import BancoCient from '../client/BancoCient';
import SituacaoClient from '../client/SituacaoClient';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {
  num1: number = 0;
  num2: number = 0;
  pessoa: PessoaModel = new PessoaModel();
  ListaBancos: string[] = [];
  ListaSituacoes: string[] = [];
  mensagem = {
    ativo: false,
    titulo: '',
    mensagem: '',
    css: ''
  };
  disabled: boolean = false;
  id: number | undefined;
  form: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id'] !== undefined) {
        this.id = Number(params['id']);
      }
      if (params['form'] !== undefined) {
        this.form = params['form'];
      }
      if (this.id !== undefined) {
        this.findById(this.id);
      }
      this.ListarBancos();
    });
  }
  
  onClickCadastrar() {
    console.log(this.pessoa);
    PessoaClient.cadastrar(this.pessoa)
      .then(success => {
        this.pessoa = new PessoaModel();
        this.mensagem.ativo = true;
        this.mensagem.mensagem = success;
        this.mensagem.titulo = 'Parabéns. ';
        this.mensagem.css = 'alert alert-success alert-dismissible fade show';
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error.data;
        this.mensagem.titulo = 'Erro. ';
        this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
      });
  }

  findById(id: number) {
    PessoaClient.findById(id)
      .then(success => {
        this.pessoa = success;
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error;
        this.mensagem.titulo = 'Erro. ';
        this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
      });
  }

  onClickEditar() {
    if (this.pessoa.id) {
      PessoaClient.editar(this.pessoa.id, this.pessoa)
        .then(success => {
          this.pessoa = new PessoaModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = 'Parabéns. ';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Erro. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    } else {
      console.error('ID da pessoa indefinido. Não é possível editar.');
    }
  }

  onClickExcluir() {
    if (this.pessoa.id) {
      PessoaClient.excluir(this.pessoa.id)
        .then(success => {
          this.pessoa = new PessoaModel();
          // Replace the next line with appropriate routing logic
          // this.router.navigate(['/condutor/listar']);
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Erro. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    } else {
      console.error('ID da pessoa indefinido. Não é possível excluir.');
    }
  }

  ListarBancos() {
    BancoCient.listaAll()
      .then(success => {
        this.ListaBancos = success;
      })
      .catch(error => {
        console.log(error);
      });
  }

  ListarSituacoes() {
    SituacaoClient.listaAll()
      .then(success => {
        this.ListaSituacoes = success;
      })
      .catch(error => {
        console.log(error);
      });
  }
}