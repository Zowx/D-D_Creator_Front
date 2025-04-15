import { Routes } from '@angular/router';
import {CreationPersoComponent } from './Pages/creation-perso/creation-perso.component';
import {HomeComponent } from './Pages/home/home.component';
import {PersonagesComponent } from './Pages/personages/personages.component';


export const routes: Routes = [
    {
        path: "creation-perso",
        component: CreationPersoComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "personages",
        component: PersonagesComponent
    },
    {
        path: "**",
        redirectTo: '/home'
    }
];