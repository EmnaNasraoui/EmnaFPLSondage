import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TousLesSujetsComponent } from './tous-les-sujets.component';

describe('TousLesSujetsComponent', () => {
  let component: TousLesSujetsComponent;
  let fixture: ComponentFixture<TousLesSujetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TousLesSujetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TousLesSujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
