import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtsStatComponent } from './pts-stat.component';

describe('PtsStatComponent', () => {
  let component: PtsStatComponent;
  let fixture: ComponentFixture<PtsStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtsStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PtsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
