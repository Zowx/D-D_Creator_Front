import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignementComponent } from './alignement.component';

describe('AlignementComponent', () => {
  let component: AlignementComponent;
  let fixture: ComponentFixture<AlignementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlignementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
