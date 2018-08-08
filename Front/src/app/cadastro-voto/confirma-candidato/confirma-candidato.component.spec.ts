import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaCandidatoComponent } from './confirma-candidato.component';

describe('ConfirmaCandidatoComponent', () => {
  let component: ConfirmaCandidatoComponent;
  let fixture: ComponentFixture<ConfirmaCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
