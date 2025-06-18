import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navbarElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    const logoElement = navbarElement.querySelector('.navbar-logo');
    expect(logoElement?.textContent).toContain('D&D Creator');
  });

  it('should display navigation links', () => {
    const navLinks = navbarElement.querySelectorAll('.navbar-link');
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Vérifie que le lien Accueil existe
    const homeLink = Array.from(navLinks).find(link => link.textContent?.includes('Accueil'));
    expect(homeLink).toBeTruthy();
    
    // Vérifie que le lien Liste de personnage existe
    const characterListLink = Array.from(navLinks).find(link => link.textContent?.includes('Liste de personnage'));
    expect(characterListLink).toBeTruthy();
  });

  it('should have correct href attributes on links', () => {
    const homeLink = navbarElement.querySelector('.navbar-link[href="/"]');
    const characterListLink = navbarElement.querySelector('.navbar-link[href="/character-list"]');
    
    expect(homeLink).toBeTruthy();
    expect(characterListLink).toBeTruthy();
  });
});

