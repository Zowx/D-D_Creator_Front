import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStatDropComponent } from './data-stat-drop.component';

describe('DataStatDropComponent', () => {
  let component: DataStatDropComponent;
  let fixture: ComponentFixture<DataStatDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataStatDropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataStatDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
