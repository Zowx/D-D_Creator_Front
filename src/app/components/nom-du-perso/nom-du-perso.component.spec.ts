import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomDuPersoComponent } from './nom-du-perso.component';

describe('NomDuPersoComponent', () => {
  let component: NomDuPersoComponent;
  let fixture: ComponentFixture<NomDuPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomDuPersoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomDuPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
