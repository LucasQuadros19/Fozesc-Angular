import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaFormComponent } from './Components/pessoa-form/pessoa-form.component';
import { PedidoFormComponent } from './Components/pedido-form/pedido-form.component';

const routes: Routes = [{ path: '', component: PessoaFormComponent },{path:'pedidioForm', component:PedidoFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
