import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaBrancoNuloComponent } from './confirma-branco-nulo.component';

describe('ConfirmaBrancoNuloComponent', () => {
  let component: ConfirmaBrancoNuloComponent;
  let fixture: ComponentFixture<ConfirmaBrancoNuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaBrancoNuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaBrancoNuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
