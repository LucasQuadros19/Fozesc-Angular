import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PessoaModel } from '../../model/PessoaModel';
import {PessoaServiceService} from 'src/Service/pessoa/pessoa-service.service';
import BancoCient from '../client/BancoCient';
import SituacaoClient from '../client/SituacaoClient';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss'],
})
export class PessoaFormComponent   {
  @Input() pessoa: PessoaModel = new PessoaModel();
  @Output() retorno = new EventEmitter<PessoaModel>();

  Service = inject(PessoaServiceService);
  constructor() {}
  salvar() {

    this.Service.adicionar(this.pessoa).subscribe({
      next: (pessoa) => {
        console.log("ESTA VIVO!!!!");
        this.retorno.emit(pessoa);
      },
      error: (erro) => {
        console.log("teste erro");
        console.error(erro);
      },
    });
  }
}
