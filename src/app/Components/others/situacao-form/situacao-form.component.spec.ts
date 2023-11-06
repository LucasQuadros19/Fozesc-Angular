import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoFormComponent } from './situacao-form.component';

describe('SituacaoFormComponent', () => {
  let component: SituacaoFormComponent;
  let fixture: ComponentFixture<SituacaoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SituacaoFormComponent]
    });
    fixture = TestBed.createComponent(SituacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
