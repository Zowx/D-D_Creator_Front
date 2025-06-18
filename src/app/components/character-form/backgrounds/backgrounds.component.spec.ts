import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundsComponent } from './backgrounds.component';
import { BackgroundService } from '../../../services/background/background.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockBackgrounds = [
  { id: '1', name: 'Acolyte', description: 'desc', abilityChoice: 1, skillsIds: [], skillChoice: 1, languagesIds: [], languagesChoice: 1, featureName: 'Feature', featureDescription: 'desc' },
  { id: '2', name: 'Charlatan', description: 'desc2', abilityChoice: 1, skillsIds: [], skillChoice: 1, languagesIds: [], languagesChoice: 0, featureName: 'Feature2', featureDescription: 'desc2' }
];

describe('BackgroundsComponent', () => {
  let component: BackgroundsComponent;
  let fixture: ComponentFixture<BackgroundsComponent>;
  let backgroundServiceSpy: jasmine.SpyObj<BackgroundService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BackgroundService', ['getAllBackgrounds']);
    await TestBed.configureTestingModule({
      imports: [BackgroundsComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: BackgroundService, useValue: spy },
        FormBuilder
      ]
    }).compileComponents();
    backgroundServiceSpy = TestBed.inject(BackgroundService) as jasmine.SpyObj<BackgroundService>;
    formBuilder = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundsComponent);
    component = fixture.componentInstance;
    component.formBackgroundsGroup = formBuilder.group({
      selectedHistorique: [''],
      selectedHistoriqueData: [null]
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load backgrounds successfully', () => {
    backgroundServiceSpy.getAllBackgrounds.and.returnValue(of(mockBackgrounds));
    component.loadBackgrounds();
    expect(component.backgroundsData).toEqual(mockBackgrounds);
    expect(component.backgroundsList).toEqual(['Acolyte', 'Charlatan']);
  });

  it('should handle error when loading backgrounds', () => {
    spyOn(console, 'error');
    backgroundServiceSpy.getAllBackgrounds.and.returnValue(throwError(() => new Error('Erreur API')));
    component.loadBackgrounds();
    expect(console.error).toHaveBeenCalled();
  });

  it('should set selectedBackgroundData when a background is selected', () => {
    component.backgroundsData = mockBackgrounds;
    component.formBackgroundsGroup.get('selectedHistoriqueData')?.setValue(null);
    component.onBackgroundSelected('Acolyte');
    expect(component.selectedBackgroundData).toEqual(mockBackgrounds[0]);
    expect(component.formBackgroundsGroup.get('selectedHistoriqueData')?.value).toEqual(mockBackgrounds[0]);
  });

  it('should set selectedBackgroundData to null if background not found', () => {
    component.backgroundsData = mockBackgrounds;
    component.selectedBackgroundData = mockBackgrounds[0];
    component.onBackgroundSelected('Inconnu');
    expect(component.selectedBackgroundData).toBeNull();
  });

  it('should subscribe to valueChanges and call onBackgroundSelected', () => {
    backgroundServiceSpy.getAllBackgrounds.and.returnValue(of(mockBackgrounds));
    spyOn(component, 'onBackgroundSelected');
    component.ngOnInit();
    component.formBackgroundsGroup.get('selectedHistorique')?.setValue('Acolyte');
    expect(component.onBackgroundSelected).toHaveBeenCalledWith('Acolyte');
  });

  it('should log error if formBackgroundsGroup is not defined in ngOnInit', () => {
    spyOn(console, 'error');
    component.formBackgroundsGroup = undefined as any;
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith("formBackgroundsGroup n'est pas défini");
  });
});
