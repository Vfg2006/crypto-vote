import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCandidatoComponent } from './busca-candidato.component';

describe('BuscaCandidatoComponent', () => {
  let component: BuscaCandidatoComponent;
  let fixture: ComponentFixture<BuscaCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
