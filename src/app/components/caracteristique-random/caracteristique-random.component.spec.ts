import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristiqueRandomComponent } from './caracteristique-random.component';

describe('CaracteristiqueRandomComponent', () => {
  let component: CaracteristiqueRandomComponent;
  let fixture: ComponentFixture<CaracteristiqueRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaracteristiqueRandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaracteristiqueRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
