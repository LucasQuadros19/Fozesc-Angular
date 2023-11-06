import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSituacaoComponent } from './tabela-situacao.component';

describe('TabelaSituacaoComponent', () => {
  let component: TabelaSituacaoComponent;
  let fixture: ComponentFixture<TabelaSituacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaSituacaoComponent]
    });
    fixture = TestBed.createComponent(TabelaSituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
