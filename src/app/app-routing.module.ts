import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaFormComponent } from './Components/pessoa-form/pessoa-form.component';
import { PedidoViewComponent } from './Views/pedido-view/pedido-view.component';
import { TabelaPessoasComponent } from './Components/tabela-pessoas/tabela-pessoas.component';

const routes: Routes = [

  { path: '', component: TabelaPessoasComponent },
  {path:'pedidioForm', component:PedidoViewComponent},
  {path:'simples', component:PedidoViewComponent},
  {path:'composto', component:PedidoViewComponent},
  {path:'diario', component:PedidoViewComponent},


]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
