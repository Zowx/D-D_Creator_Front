import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'character-list', component: CharacterListComponent },
  { path: 'profile', component: ProfileComponent },
];
