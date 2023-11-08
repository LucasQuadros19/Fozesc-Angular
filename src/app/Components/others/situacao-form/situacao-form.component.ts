import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Situacao } from 'src/app/model/Situacao';
import {SituacaoServiceService} from 'src/Service/situacao/situacao-service.service';

@Component({
  selector: 'app-situacao-form',
  templateUrl: './situacao-form.component.html',
  styleUrls: ['./situacao-form.component.scss']
})
export class SituacaoFormComponent {
  @Input() situacoes: Situacao = new Situacao();
  @Output() retorno = new EventEmitter<Situacao>();

  Service = inject(SituacaoServiceService);
  constructor() {}
  salvar() {

    this.Service.adicionar(this.situacoes).subscribe({
      next: (Situacao) => {
        this.retorno.emit(Situacao);
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }
}
