import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsComponent } from './characteristics.component';

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CharacteristicsComponent]
    });
    fixture = TestBed.createComponent(CharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
