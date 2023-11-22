import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeCadastroComponent } from './cheque-cadastro.component';

describe('ChequeCadastroComponent', () => {
  let component: ChequeCadastroComponent;
  let fixture: ComponentFixture<ChequeCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeCadastroComponent]
    });
    fixture = TestBed.createComponent(ChequeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
