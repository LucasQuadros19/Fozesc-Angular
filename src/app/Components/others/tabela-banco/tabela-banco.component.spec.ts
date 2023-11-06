import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaBancoComponent } from './tabela-banco.component';

describe('TabelaBancoComponent', () => {
  let component: TabelaBancoComponent;
  let fixture: ComponentFixture<TabelaBancoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaBancoComponent]
    });
    fixture = TestBed.createComponent(TabelaBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
