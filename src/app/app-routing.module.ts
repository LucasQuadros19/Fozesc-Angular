import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaFormComponent } from './Components/pessoa-form/pessoa-form.component';
import { PedidoViewComponent } from './Views/pedido-view/pedido-view.component';
import { TabelaPessoasComponent } from './Components/tabela-pessoas/tabela-pessoas.component';


import { TabelaBancoComponent } from './Components/others/tabela-banco/tabela-banco.component';
import { TabelaSituacaoComponent } from './Components/others/tabela-situacao/tabela-situacao.component';
import { TabelaFormaPagamentoComponent } from './Components/others/tabela-forma-pagamento/tabela-forma-pagamento.component';
import { TabelaPedidosComponent } from './Components/tabela-pedidos/tabela-pedidos.component';

const routes: Routes = [

  { path: '', component: TabelaPessoasComponent },
  {path:'pedido', component:TabelaPedidosComponent},
  {path:'simples', component:PedidoViewComponent},
  {path:'composto', component:PedidoViewComponent},
  {path:'diario', component:PedidoViewComponent},

  {path:'banco', component:TabelaBancoComponent},
  {path:'situacao', component:TabelaSituacaoComponent},
  {path:'FormaPagamento', component:TabelaFormaPagamentoComponent},
  


]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
