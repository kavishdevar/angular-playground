import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LearnComponent } from './learn.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'learn', component: LearnComponent},
];
