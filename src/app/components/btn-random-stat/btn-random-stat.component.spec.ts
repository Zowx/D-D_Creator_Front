import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRandomStatComponent } from './btn-random-stat.component';

describe('BtnRandomStatComponent', () => {
  let component: BtnRandomStatComponent;
  let fixture: ComponentFixture<BtnRandomStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnRandomStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnRandomStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
