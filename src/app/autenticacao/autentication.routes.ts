import { Routes } from "@angular/router";
import { AlterarSenhaComponent } from "./alterar-senha/alterar-senha.component";
import { authGuard } from "./auth/Auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { EmailSendComponent } from "./esqueceu-senha/Email/emailSend.component";

export const routes: Routes = [
    {
        path: "signup", component: SignupComponent,
        title:"Tela de cadastro"
    },
    {
        path: "user/perfil", component: PerfilComponent, canActivate: [authGuard], data: { acess:  ["user","admin","suporte","dev"] },title:"perfil usuario"
    },
    {
        path: "alterar/senha", component: AlterarSenhaComponent, canActivate: [authGuard], data: { acess: ["user","admin","suporte","dev"] },
        title:"Nova senha"
    },
    // {
    //     path: "alterar/senha/:email", component: CodigoComponent
    // },
    {
        path: "send/email", component: EmailSendComponent,
        title:"Esqueceu a senha"
    },
    // {
    //     path: "esqueceu/senha", component: EsqueceuSenhaComponent,
    //     title:"Esqueceu a senha"
    // },
    {
        path: "login", component: SigninComponent,
        title:"Tela de login - Chamado TI"
    }
];

