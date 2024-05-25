import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceViewerComponent } from './annonce-viewer.component';

describe('AnnonceViewerComponent', () => {
  let component: AnnonceViewerComponent;
  let fixture: ComponentFixture<AnnonceViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnonceViewerComponent]
    });
    fixture = TestBed.createComponent(AnnonceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
