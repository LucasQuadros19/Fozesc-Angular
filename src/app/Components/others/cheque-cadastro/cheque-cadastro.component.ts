import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cheque } from 'src/app/model/Cheque';
import { ChequeServiceService } from 'src/Service/cheque/cheque-service.service';

@Component({
  selector: 'app-cheque-cadastro',
  templateUrl: './cheque-cadastro.component.html',
  styleUrls: ['./cheque-cadastro.component.scss'],
})
export class ChequeCadastroComponent {
  @Input() cheques: Cheque = new Cheque();
  @Output() retorno = new EventEmitter<Cheque>();

  Service = inject(ChequeServiceService);
  constructor() {}
  salvar() {
    this.retorno.emit(this.cheques);
  }
}
