import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoojaTableComponent } from './pooja-table.component';

describe('PoojaTableComponent', () => {
  let component: PoojaTableComponent;
  let fixture: ComponentFixture<PoojaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoojaTableComponent]
    });
    fixture = TestBed.createComponent(PoojaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
