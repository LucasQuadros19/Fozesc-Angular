import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PessoaModel } from '../../model/PessoaModel';
import { Bancos } from '../../model/Bancos';
import { Situacao } from '../../model/Situacao';
import {PessoaServiceService} from 'src/Service/pessoa/pessoa-service.service';
import {BancoserviceService} from 'src/Service/banco/bancoservice.service';
import {SituacaoServiceService} from 'src/Service/situacao/situacao-service.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss'],
})
export class PessoaFormComponent   {
  @Input() pessoa: PessoaModel = new PessoaModel();
  @Output() retorno = new EventEmitter<PessoaModel>();

  Service = inject(PessoaServiceService);

  listaBanco: Bancos[] = [];
  listaSituacao: Situacao[] = [];

  constructor(
    private bancoService: BancoserviceService,
    private situacaoService: SituacaoServiceService,
  ) {this.listAllBanco();
    this.listAllSituacao(); }

  listAllBanco() {
    this.bancoService.listar().subscribe({
      next: (listaBanco) => {
        this.listaBanco = listaBanco;
      },
      error: (erro) => {
        alert('Erro inesperado, por favor recarregue a página!');
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
        alert('Erro inesperado, por favor recarregue a página!');
        console.error(erro);
      },
    });
  }


  salvar() {
    console.log("testett");
   
    this.Service.adicionar(this.pessoa).subscribe({
      next: (pessoa) => {
        console.log("ESTA VIVO!!!!");
        console.log(this.pessoa);
     
        this.retorno.emit(pessoa);
      },
      error: (erro) => {
        console.log("teste erro");
        console.log(this.pessoa);
        
        console.error(erro);
      },
    });
  }

  byId(item1: any, item2: any) {
    return item1 && item2 && item1.id === item2.id;
  }
  
  adicionarBanco(banco: Bancos) {
    this.pessoa.banco = banco;
  }
  adicionarSituacao(situacao: Situacao) {
    this.pessoa.situacao = situacao;
  }

}
