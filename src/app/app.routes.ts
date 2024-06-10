import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { RelatorioComponent } from './admin/relatorio/relatorio.component';
const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/cards'
    },
    {
        path: '',loadChildren:()=>import("./Home/Home.routes").then(e=>e.routes),
    },
    {
        path: 'relatorio',component:RelatorioComponent
    },
    {
        path: "**", component: ErrorComponent
    },
];

export { routes };
