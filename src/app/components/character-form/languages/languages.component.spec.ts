import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagesComponent } from './languages.component';
import { LanguagesService } from '../../../services/languages/languages.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockLanguages = [
  { id: 1, name: 'Elvish', description: 'Langue des elfes', exotic: false },
  { id: 2, name: 'Orcish', description: 'Langue des orcs', exotic: true }
];

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  let languagesServiceSpy: jasmine.SpyObj<LanguagesService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('LanguagesService', ['getLanguages']);
    await TestBed.configureTestingModule({
      imports: [LanguagesComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: LanguagesService, useValue: serviceSpy },
        FormBuilder
      ]
    }).compileComponents();
    languagesServiceSpy = TestBed.inject(LanguagesService) as jasmine.SpyObj<LanguagesService>;
    formBuilder = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    component.formLanguagesGroup = formBuilder.group({
      languages: formBuilder.array([]),
      selectedLanguage: ['']
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load languages successfully', () => {
    languagesServiceSpy.getLanguages.and.returnValue(of(mockLanguages));
    component.loadLanguages();
    expect(component.languagesData).toEqual(mockLanguages);
    expect(component.languageList).toEqual(['Elvish', 'Orcish']);
  });

  it('should handle error when loading languages', () => {
    spyOn(console, 'error');
    languagesServiceSpy.getLanguages.and.returnValue(throwError(() => new Error('Erreur API')));
    component.loadLanguages();
    expect(console.error).toHaveBeenCalled();
  });

  it('should add a language when checked', () => {
    component.chosenLanguages = [];
    component.languagesData = mockLanguages;
    const event = { target: { checked: true } };
    component.onLanguageChange(event, 'Elvish');
    expect(component.chosenLanguages).toContain('Elvish');
    expect(component.selectedLanguagesData[0].name).toBe('Elvish');
  });

  it('should not add more than maxLanguages', () => {
    component.chosenLanguages = ['Elvish', 'Orcish'];
    const event = { target: { checked: true } };
    spyOn(window, 'alert');
    component.onLanguageChange(event, 'Dwarvish');
    expect(window.alert).toHaveBeenCalledWith('Vous ne pouvez choisir que 2 langues maximum.');
    expect(component.chosenLanguages.length).toBe(2);
  });

  it('should remove a language when unchecked', () => {
    component.chosenLanguages = ['Elvish', 'Orcish'];
    component.languagesData = mockLanguages;
    const event = { target: { checked: false } };
    component.onLanguageChange(event, 'Orcish');
    expect(component.chosenLanguages).not.toContain('Orcish');
    expect(component.selectedLanguagesData.length).toBe(1);
  });

  it('should update FormArray when languages change', () => {
    component.chosenLanguages = ['Elvish', 'Orcish'];
    component.formLanguagesGroup.setControl('languages', new FormArray([]));
    component.updateFormControl();
    const arr = component.formLanguagesGroup.get('languages') as FormArray;
    expect(arr.length).toBe(2);
    expect(arr.value).toEqual(['Elvish', 'Orcish']);
  });

  it('should return true if language is selected', () => {
    component.chosenLanguages = ['Elvish'];
    expect(component.isLanguageSelected('Elvish')).toBeTrue();
    expect(component.isLanguageSelected('Orcish')).toBeFalse();
  });

  it('should log error if formLanguagesGroup is not defined in ngOnInit', () => {
    spyOn(console, 'error');
    component.formLanguagesGroup = undefined as any;
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith("formLanguagesGroup n'est pas défini");
  });
});
