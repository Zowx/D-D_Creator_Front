import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCardComponent } from './char-card.component';

describe('CharCardComponent', () => {
  let component: CharCardComponent;
  let fixture: ComponentFixture<CharCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
