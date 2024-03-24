import { DadosReecebidosComponent } from './templete/dados-reecebidos/dados-tecnicos/dadosUsuarios/dados-reecebidos.component';
import { Routes, Router } from '@angular/router';
import { TelaHomeComponent } from './Home/tela-home/tela-home.component';
import { CamposComponent } from './templete/campos/campos.component';
import { CanvasComponent } from './grafico/canvas/canvas.component';
import { ExcelComponentComponent } from './excel-component/excel-component.component';
import { ListaAdmComponent } from './shared/lista-adm/lista-adm.component';
import { ListaUserComponent } from './shared/lista-user/lista-user.component';
import { DadosDetalheComponent } from './templete/dados-reecebidos/dados-tecnicos/DetalhesAdm/dados-detalhe.component';
let user = "admin";
let routes: Routes;
switch(user){
    case "user":
       routes = [
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
                path:"lista", component:ListaUserComponent
            }
        ];
        break;
    case "admin":
        routes = [
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
                path:"chamado/:card/:id/admin",component:DadosDetalheComponent
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
        break;
    default:
        routes=[
            {
                path:'', pathMatch:'full', redirectTo:'/cards'
            }
        ]
        break
        
        
}

export {routes };