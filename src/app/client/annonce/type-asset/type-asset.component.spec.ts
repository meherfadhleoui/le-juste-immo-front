import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAssetComponent } from './type-asset.component';

describe('TypeAssetComponent', () => {
  let component: TypeAssetComponent;
  let fixture: ComponentFixture<TypeAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TypeAssetComponent]
    });
    fixture = TestBed.createComponent(TypeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
