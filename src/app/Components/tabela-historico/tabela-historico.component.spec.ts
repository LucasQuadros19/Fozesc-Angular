import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaHistoricoComponent } from './tabela-historico.component';

describe('TabelaHistoricoComponent', () => {
  let component: TabelaHistoricoComponent;
  let fixture: ComponentFixture<TabelaHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaHistoricoComponent]
    });
    fixture = TestBed.createComponent(TabelaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
