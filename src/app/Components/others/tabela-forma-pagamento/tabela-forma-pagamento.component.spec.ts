import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaFormaPagamentoComponent } from './tabela-forma-pagamento.component';

describe('TabelaFormaPagamentoComponent', () => {
  let component: TabelaFormaPagamentoComponent;
  let fixture: ComponentFixture<TabelaFormaPagamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaFormaPagamentoComponent]
    });
    fixture = TestBed.createComponent(TabelaFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
