// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Venue } from './pages/public/facilities/venue/venue';
import { Band } from './pages/public/facilities/band/band';
import { Decoration } from './pages/public/facilities/decoration/decoration';



export const routes: Routes = [
    { path: '', component: Home },                    // Home page
    { path: 'venues', component: Venue },             // Venues page
    { path: 'bands', component: Band },               // Bands page
    { path: 'decorations', component: Decoration },   // Decorations page
    
    // Redirect unknown routes to home
    { path: '**', redirectTo: '' }
];
