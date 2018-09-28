import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResultadoComponent } from './dashboard-resultado.component';

describe('DashboardResultadoComponent', () => {
  let component: DashboardResultadoComponent;
  let fixture: ComponentFixture<DashboardResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
