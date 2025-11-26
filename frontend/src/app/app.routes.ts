import { Routes } from '@angular/router';
import { HOME_ROUTE } from './pages/public/home/home.route';
export const routes: Routes = [
    HOME_ROUTE, 
    { path: '**', redirectTo: '' }
];
