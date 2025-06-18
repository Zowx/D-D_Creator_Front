import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterFormComponent } from './character-form.component';
import { AlignmentService } from '../../services/alignment/alignment.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CharacterFormComponent', () => {
  let component: CharacterFormComponent;
  let fixture: ComponentFixture<CharacterFormComponent>;
  let alignmentServiceSpy: jasmine.SpyObj<AlignmentService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AlignmentService', ['getAllAlignments']);
    await TestBed.configureTestingModule({
      imports: [CharacterFormComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AlignmentService, useValue: spy }
      ]
    }).compileComponents();
    alignmentServiceSpy = TestBed.inject(AlignmentService) as jasmine.SpyObj<AlignmentService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    alignmentServiceSpy.getAllAlignments.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.getFormCharacter()).toBeTruthy();
    expect(component.getFormCharacter().get('formClasses')).toBeTruthy();
    expect(component.getFormCharacter().get('formRaces')).toBeTruthy();
    expect(component.getFormCharacter().get('formHistoriques')).toBeTruthy();
    expect(component.getFormCharacter().get('formLanguages')).toBeTruthy();
    expect(component.getFormCharacter().get('detailCharacter')).toBeTruthy();
  });

  it('should load alignment options on success', () => {
    const mockAlignments = [{ name: 'Loyal Bon' }, { name: 'Chaotique Mauvais' }];
    alignmentServiceSpy.getAllAlignments.and.returnValue(of(mockAlignments));
    component.ngOnInit();
    expect(component.alignmentOptions).toEqual(['Loyal Bon', 'Chaotique Mauvais']);
  });

  it('should handle error when loading alignment options', () => {
    spyOn(console, 'error');
    alignmentServiceSpy.getAllAlignments.and.returnValue(throwError(() => new Error('Erreur API')));
    component.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });

  it('should show validation errors if form is invalid on submit', () => {
    alignmentServiceSpy.getAllAlignments.and.returnValue(of([]));
    component.ngOnInit();
    component.getFormCharacter().patchValue({
      formClasses: { selectedClasse: null },
      formRaces: { selectedRace: null },
      formHistoriques: { selectedHistorique: null },
      formLanguages: { languages: [] },
      detailCharacter: { nom: '', alignment: '' }
    });
    component.onSubmit();
    expect(component.validationErrorMessage).toContain('Veuillez corriger les erreurs suivantes');
  });
});
