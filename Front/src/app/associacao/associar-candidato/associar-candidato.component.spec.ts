import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarCandidatoComponent } from './associar-candidato.component';

describe('AssociarCandidatoComponent', () => {
  let component: AssociarCandidatoComponent;
  let fixture: ComponentFixture<AssociarCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
