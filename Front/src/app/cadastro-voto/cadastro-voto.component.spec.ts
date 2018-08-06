import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVotoComponent } from './cadastro-voto.component';

describe('CadastroVotoComponent', () => {
  let component: CadastroVotoComponent;
  let fixture: ComponentFixture<CadastroVotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
