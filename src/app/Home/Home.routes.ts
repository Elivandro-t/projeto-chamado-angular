import { Routes } from "@angular/router";
import { authGuard } from "../autenticacao/auth/Auth.guard";
import { TelaHomeComponent } from "./tela-home/tela-home.component";
import { AddRoleComponent } from "../autenticacao/AdicionarPerfil/AddRole.component";
import { ItensSistemaComponent } from "../autenticacao/perfil/itens-sistema/itens-sistema.component";
import { ExcelComponentComponent } from "../excel-component/excel-component.component";
import { CanvasComponent } from "../grafico/canvas/canvas.component";
import { ListaAdmComponent } from "../shared/lista-adm/lista-adm.component";
import { ListaAguardandoValidacaoComponent } from "../shared/lista-aguardando-validacao/lista-aguardando-validacao.component";
import { ListaUserComponent } from "../shared/lista-user/lista-user.component";
import { DadosDetalheComponent } from "../shared/templete/dados-reecebidos/dados-tecnicos/DetalhesAdm/dados-detalhe.component";
import { DadosReecebidosComponent } from "../shared/templete/dados-reecebidos/dados-tecnicos/dadosUsuarios/dados-reecebidos.component";
import { ServiceComponent } from "../shared/templete/service/service.component";
import { CamposComponent } from "../shared/templete/campos/campos.component";
import { ListaTecnicoComponent } from "../shared/lista-tecnico/lista-tecnico.component";
import { ListaFiliaisComponent } from "../shared/ListaChamadosFiliais/lista-chamados-filiais.component";
export const routes: Routes = [
  
    {
        path: 'cards', component: TelaHomeComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] },
        title:"cards - Chamados"
    },
    {
        path: 'sistema/:id/serviços/:data/:name/:index', component: CamposComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] }
    },
    {
        path: 'itens/:id', component: ServiceComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] }
    },
    {
        path: "chamado/:card/:id/:cardid/create", component: DadosReecebidosComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] }
    },
    {
        path: "chamado/:card/:id/:cardid/admin", component: DadosDetalheComponent, canActivate: [authGuard], data: { acess: ["user","admin","suporte","dev"] }
    },
    {
        path: "canvas", component: CanvasComponent, canActivate: [authGuard], data: { acess: ["admin","suporte","dev"] }
    },
    {
        path: "planilha", component: ExcelComponentComponent, canActivate: [authGuard], data: { acess:  ["admin","suporte","dev"] }
    },
    {
        path: "add/card", component: ItensSistemaComponent, canActivate: [authGuard], data: { acess:  ["suporte","dev"] }
    },
    {
        path: "lista", component: ListaUserComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] },title:"Lista de chamado usuarios"
    },
    {
        path: "lista/admin", component: ListaAdmComponent, canActivate: [authGuard], data: { acess: ["admin","suporte","dev"] },title:"Lista de chamados admin"
    },
    {
        path: "lista/chamados/filiais", component: ListaFiliaisComponent, canActivate: [authGuard], data: { acess: ["suporte"] },title:"Lista de chamados filiais"
    }
    ,
    {
        path: "meuchamado/aceito", component: ListaTecnicoComponent, canActivate: [authGuard], data: { acess: ["admin","suporte","dev"] },title:"chamados usuario tecnico"
    },
    {
        path: "add/role", component: AddRoleComponent, canActivate: [authGuard], data: { acess:  ["suporte","dev"] },title:"adicionar perfil"
    },

    {
        path: "lista/aprovacoes/pendentes", component: ListaAguardandoValidacaoComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] },title:"aprovações"
    },
    {
        path:"auth", loadChildren:()=>import("../autenticacao/autentication.routes").then(s=>s.routes)
    }
];