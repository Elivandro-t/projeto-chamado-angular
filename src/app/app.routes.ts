import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { RelatorioComponent } from './admin/relatorio/relatorio.component';
import { AboutComponentComponent } from '../About/about.component';
import { authGuard } from './autenticacao/auth/Auth.guard';
import { ComprasComponent } from './shared/templete/campos/Compras/compras.component';
import { ConexaoActive } from './autenticacao/auth/conectionActive';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/cards'
    },
    {
        path: '',loadChildren:()=>import("../app/Home/Home.routes").then(e=>e.routes),
        canActivate:[ConexaoActive]
    },
    {
        path:"auth", loadChildren:()=>import("./autenticacao/autentication.routes").then(s=>s.routes),
        canActivate:[ConexaoActive]
    },
    {
        path: 'relatorio',component:RelatorioComponent,
        canActivate:[ConexaoActive]
    },
    {
        path: 'about',component:AboutComponentComponent
    },
    {
        path:"compras", component:ComprasComponent, title:"compras", canActivate: [authGuard,ConexaoActive], data: { acess:  ["user","admin","suporte","dev"] }
    },
    {
        path: "**", component: ErrorComponent,
        canActivate:[ConexaoActive]
    },
]; 

export { routes };
