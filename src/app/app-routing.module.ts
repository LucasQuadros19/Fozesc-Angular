import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaFormComponent } from './Components/pessoa-form/pessoa-form.component';
import { PedidoViewComponent } from './Views/pedido-view/pedido-view.component';

const routes: Routes = [{ path: '', component: PessoaFormComponent },{path:'pedidioForm', component:PedidoViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
