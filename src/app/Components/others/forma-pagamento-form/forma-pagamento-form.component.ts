import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import {FormaPagamentoService} from 'src/Service/FormaPagamento/forma-pagamento.service';


@Component({
  selector: 'app-forma-pagamento-form',
  templateUrl: './forma-pagamento-form.component.html',
  styleUrls: ['./forma-pagamento-form.component.scss']
})
export class FormaPagamentoFormComponent {
  @Input() formaPagamento: FormaPagamento = new FormaPagamento();
  @Output() retorno = new EventEmitter<FormaPagamento>();

  Service = inject(FormaPagamentoService);
  constructor() {}
  salvar() {

    this.Service.adicionar(this.formaPagamento).subscribe({
      next: (formaPagamento) => {
        this.retorno.emit(formaPagamento);
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }
}
