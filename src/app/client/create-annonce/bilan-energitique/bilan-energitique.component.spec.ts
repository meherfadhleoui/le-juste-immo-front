import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanEnergitiqueComponent } from './bilan-energitique.component';

describe('BilanEnergitiqueComponent', () => {
  let component: BilanEnergitiqueComponent;
  let fixture: ComponentFixture<BilanEnergitiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BilanEnergitiqueComponent]
    });
    fixture = TestBed.createComponent(BilanEnergitiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
