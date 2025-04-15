import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPersoComponent } from './creation-perso.component';

describe('CreationPersoComponent', () => {
  let component: CreationPersoComponent;
  let fixture: ComponentFixture<CreationPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationPersoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
