import { DadosReecebidosComponent } from './templete/dados-reecebidos/dados-reecebidos.component';
import { Routes } from '@angular/router';
import { TelaHomeComponent } from './Home/tela-home/tela-home.component';
import { MuralComponent } from './templete/mural/mural.component';
import { CamposComponent } from './templete/campos/campos.component';
import { CanvasComponent } from './grafico/canvas/canvas.component';
import { ExcelComponentComponent } from './excel-component/excel-component.component';
import { ListaAdmComponent } from './shared/lista-adm/lista-adm.component';
import { ListaUserComponent } from './shared/lista-user/lista-user.component';

export const routes: Routes = [
    {
        path:'', pathMatch:'full', redirectTo:'/cards'
    },
    {
        path:'cards',component:TelaHomeComponent
    },
    {
        path:'hardware', component:CamposComponent
    },
    {
        path:"chamado/:card/:id",component:DadosReecebidosComponent
    },
    {
        path:"canvas", component:CanvasComponent
    },
    {
        path:"planilha", component:ExcelComponentComponent
    },
    {
        path:"lista", component:ListaUserComponent
    },
    {
        path:"lista/admin", component:ListaAdmComponent
    }
];
