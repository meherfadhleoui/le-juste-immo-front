import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightAuthPanelComponent } from './right-auth-panel.component';

describe('RightAuthPanelComponent', () => {
  let component: RightAuthPanelComponent;
  let fixture: ComponentFixture<RightAuthPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightAuthPanelComponent],
    });
    fixture = TestBed.createComponent(RightAuthPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
