import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { RelatorioComponent } from './admin/relatorio/relatorio.component';
import { AboutComponentComponent } from '../About/about.component';
const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/cards'
    },
    {
        path: '',loadChildren:()=>import("../app/Home/Home.routes").then(e=>e.routes),
    },
    {
        path: 'relatorio',component:RelatorioComponent
    },
    {
        path: 'about',component:AboutComponentComponent
    },
    {
        path: "**", component: ErrorComponent
    },
]; 

export { routes };
