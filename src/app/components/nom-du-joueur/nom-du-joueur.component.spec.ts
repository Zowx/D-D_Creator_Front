import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomDuJoueurComponent } from './nom-du-joueur.component';

describe('NomDuJoueurComponent', () => {
  let component: NomDuJoueurComponent;
  let fixture: ComponentFixture<NomDuJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomDuJoueurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomDuJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
