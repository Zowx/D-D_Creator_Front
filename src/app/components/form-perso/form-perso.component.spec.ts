import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersoComponent } from './form-perso.component';

describe('FormPersoComponent', () => {
  let component: FormPersoComponent;
  let fixture: ComponentFixture<FormPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPersoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
