import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedImageComponent } from './featured-image.component';

describe('FeaturedImageComponent', () => {
  let component: FeaturedImageComponent;
  let fixture: ComponentFixture<FeaturedImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedImageComponent]
    });
    fixture = TestBed.createComponent(FeaturedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
