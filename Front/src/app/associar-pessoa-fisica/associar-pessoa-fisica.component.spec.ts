import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarPessoaFisicaComponent } from './associar-pessoa-fisica.component';

describe('AssociarPessoaFisicaComponent', () => {
  let component: AssociarPessoaFisicaComponent;
  let fixture: ComponentFixture<AssociarPessoaFisicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarPessoaFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarPessoaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
