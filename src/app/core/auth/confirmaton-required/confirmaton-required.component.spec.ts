import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmatonRequiredComponent } from './confirmaton-required.component';

describe('ConfirmatonRequiredComponent', () => {
  let component: ConfirmatonRequiredComponent;
  let fixture: ComponentFixture<ConfirmatonRequiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmatonRequiredComponent]
    });
    fixture = TestBed.createComponent(ConfirmatonRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
