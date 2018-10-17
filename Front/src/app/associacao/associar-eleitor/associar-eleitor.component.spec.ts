import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarEleitorComponent } from './associar-eleitor.component';

describe('AssociarEleitorComponent', () => {
  let component: AssociarEleitorComponent;
  let fixture: ComponentFixture<AssociarEleitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarEleitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarEleitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
