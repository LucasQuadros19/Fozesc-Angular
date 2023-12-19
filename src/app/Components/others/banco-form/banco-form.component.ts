import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Bancos } from 'src/app/model/Bancos';
import {BancoserviceService} from 'src/Service/banco/bancoservice.service';


@Component({
  selector: 'app-banco-form',
  templateUrl: './banco-form.component.html',
  styleUrls: ['./banco-form.component.scss']
})
export class BancoFormComponent {
  @Input() banco: Bancos = new Bancos();
  @Output() retorno = new EventEmitter<Bancos>();

  Service = inject(BancoserviceService);
  constructor() {}
  salvar() {
    this.Service.adicionar(this.banco).subscribe({
      next: (mensagem) => { //mensagem 

        console.log("ESTA VIVO!!!!");
        this.retorno.emit(this.banco);
        
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }
}
