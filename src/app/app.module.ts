import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaFormComponent } from './Components/pessoa-form/pessoa-form.component';
import { PedidoFormComponent } from './Components/pedido-form/pedido-form.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './Components/nav/nav.component';
import { PedidoViewComponent } from './Views/pedido-view/pedido-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaFormComponent,
    PedidoFormComponent,
    NavComponent,
    PedidoViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
