import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassesComponent } from './classes.component';
import { ClassesService } from '../../../services/classes/classes.service';
import { AbilityService } from '../../../services/ability/ability.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockClasses = [
  { id: '1', name: 'Guerrier', hitDice: 'd10', savingThrows: ['1', '2'] },
  { id: '2', name: 'Champion', hitDice: null, savingThrows: ['1', '2'], subClass: '1' }
];
const mockAbilities = [
  { id: 1, name: 'Force', description: 'desc', short_desc: 'desc' },
  { id: 2, name: 'Dextérité', description: 'desc', short_desc: 'desc' }
];

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;
  let classesServiceSpy: jasmine.SpyObj<ClassesService>;
  let abilityServiceSpy: jasmine.SpyObj<AbilityService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const classesSpy = jasmine.createSpyObj('ClassesService', ['getClasses']);
    const abilitySpy = jasmine.createSpyObj('AbilityService', ['getAbility', 'getAbilityById']);
    await TestBed.configureTestingModule({
      imports: [ClassesComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ClassesService, useValue: classesSpy },
        { provide: AbilityService, useValue: abilitySpy },
        FormBuilder
      ]
    }).compileComponents();
    classesServiceSpy = TestBed.inject(ClassesService) as jasmine.SpyObj<ClassesService>;
    abilityServiceSpy = TestBed.inject(AbilityService) as jasmine.SpyObj<AbilityService>;
    formBuilder = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    component.formClassesGroup = formBuilder.group({
      selectedClasse: [''],
      selectedSubClass: ['']
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load classes successfully', () => {
    classesServiceSpy.getClasses.and.returnValue(of(mockClasses));
    component.loadClasses();
    expect(component.classesData).toEqual(mockClasses);
    expect(component.mainClasses.length).toBe(1);
    expect(component.subClasses.length).toBe(1);
    expect(component.classList).toEqual(['Guerrier']);
  });

  it('should handle error when loading classes', () => {
    spyOn(console, 'error');
    classesServiceSpy.getClasses.and.returnValue(throwError(() => new Error('Erreur API')));
    component.loadClasses();
    expect(console.error).toHaveBeenCalled();
  });

  it('should load abilities successfully', () => {
    abilityServiceSpy.getAbility.and.returnValue(of(mockAbilities));
    component.loadAllAbilities();
    expect(component.allAbilities).toEqual(mockAbilities);
  });

  it('should handle error when loading abilities', () => {
    spyOn(console, 'error');
    abilityServiceSpy.getAbility.and.returnValue(throwError(() => new Error('Erreur API')));
    component.loadAllAbilities();
    expect(console.error).toHaveBeenCalled();
  });

  it('should set selectedClasseData and subClasses on class selection', () => {
    component.mainClasses = [mockClasses[0]];
    component.subClasses = [mockClasses[1]];
    component.allAbilities = mockAbilities;
    component.onClasseSelected('Guerrier');
    expect(component.selectedClasseData).toEqual(mockClasses[0]);
    expect(component.selectedSubClasses).toEqual([mockClasses[1]]);
  });

  it('should reset selectedSubClass and form control on class selection', () => {
    component.mainClasses = [mockClasses[0]];
    component.subClasses = [mockClasses[1]];
    component.formClassesGroup.get('selectedSubClass')?.setValue('Champion');
    component.onClasseSelected('Guerrier');
    expect(component.selectedSubClass).toBeNull();
    expect(component.formClassesGroup.get('selectedSubClass')?.value).toBeNull();
  });

  it('should set selectedSubClass on subClass selection', () => {
    component.selectedSubClasses = [mockClasses[1]];
    component.onSubClassSelected('Champion');
    expect(component.selectedSubClass).toEqual(mockClasses[1]);
  });

  it('should set selectedClasseSavingThrows with ability objects', () => {
    component.allAbilities = mockAbilities;
    component.selectedClasseSavingThrows = [];
    component.loadSavingThrowsNames([1, 2]); // Correction ici : on passe des nombres
    expect(component.selectedClasseSavingThrows.length).toBe(2);
    expect(component.selectedClasseSavingThrows[0].name).toBe('Force');
  });

  it('should set selectedClasseSavingThrows with objects if already objects', () => {
    component.selectedClasseSavingThrows = [];
    component.loadSavingThrowsNames([mockAbilities[0], mockAbilities[1]]);
    expect(component.selectedClasseSavingThrows).toEqual(mockAbilities);
  });

  it('should log error if formClassesGroup is not defined in ngOnInit', () => {
    spyOn(console, 'error');
    component.formClassesGroup = undefined as any;
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith("formClassesGroup n'est pas défini");
  });
});
