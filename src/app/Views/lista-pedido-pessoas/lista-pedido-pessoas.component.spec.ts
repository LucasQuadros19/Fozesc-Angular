import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidoPessoasComponent } from './lista-pedido-pessoas.component';

describe('ListaPedidoPessoasComponent', () => {
  let component: ListaPedidoPessoasComponent;
  let fixture: ComponentFixture<ListaPedidoPessoasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPedidoPessoasComponent]
    });
    fixture = TestBed.createComponent(ListaPedidoPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
