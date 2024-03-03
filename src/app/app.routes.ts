import { Routes } from '@angular/router';
import { TelaHomeComponent } from './Home/tela-home/tela-home.component';
import { MuralComponent } from './templete/mural/mural.component';

export const routes: Routes = [
    {
        path:'', pathMatch:'full', redirectTo:'/cards'
    },
    {
        path:'cards',component:TelaHomeComponent
    },
    {
        path:'hardware', component:MuralComponent
    }
];
