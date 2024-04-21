import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchComponent } from './home-search.component';

describe('HomeSearchComponent', () => {
  let component: HomeSearchComponent;
  let fixture: ComponentFixture<HomeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeSearchComponent],
    });
    fixture = TestBed.createComponent(HomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
