import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaFormComponent } from './Components/pessoa-form/pessoa-form.component';
import { PedidoFormComponent } from './Components/pedido-form/pedido-form.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './Components/nav/nav.component';
import { PedidoViewComponent } from './Views/pedido-view/pedido-view.component';
import { ListaPedidosComponent } from './Views/lista-pedidos/lista-pedidos.component';
import { ListaPessoasComponent } from './Views/lista-pessoas/lista-pessoas.component';
import { ListaPedidoPessoasComponent } from './Views/lista-pedido-pessoas/lista-pedido-pessoas.component';
import { HistoricoComponent } from './Views/historico/historico.component';
import { TabelaPedidosComponent } from './Components/tabela-pedidos/tabela-pedidos.component';
import { TabelaPessoasComponent } from './Components/tabela-pessoas/tabela-pessoas.component';
import { TabelaHistoricoComponent } from './Components/tabela-historico/tabela-historico.component';
import { TabelaBancoComponent } from './Components/others/tabela-banco/tabela-banco.component';
import { BancoFormComponent } from './Components/others/banco-form/banco-form.component';
import { TabelaSituacaoComponent } from './Components/others/tabela-situacao/tabela-situacao.component';
import { SituacaoFormComponent } from './Components/others/situacao-form/situacao-form.component';
import { FormaPagamentoFormComponent } from './Components/others/forma-pagamento-form/forma-pagamento-form.component';
import { TabelaFormaPagamentoComponent } from './Components/others/tabela-forma-pagamento/tabela-forma-pagamento.component';
import { ChequeCadastroComponent } from './Components/others/cheque-cadastro/cheque-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaFormComponent,
    PedidoFormComponent,
    NavComponent,
    PedidoViewComponent,
    ListaPedidosComponent,
    ListaPessoasComponent,
    ListaPedidoPessoasComponent,
    HistoricoComponent,
    TabelaPedidosComponent,
    TabelaPessoasComponent,
    TabelaHistoricoComponent,
    TabelaBancoComponent,
    BancoFormComponent,
    TabelaSituacaoComponent,
    SituacaoFormComponent,
    FormaPagamentoFormComponent,
    TabelaFormaPagamentoComponent,
    ChequeCadastroComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
