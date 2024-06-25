/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Routes } from "@angular/router";
import { RelatorioComponent } from "../app/admin/relatorio/relatorio.component";
import { ErrorComponent } from "../app/shared/error/error.component";
import { AboutComponentComponent } from "../About/about.component";

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
        path: "**", component: ErrorComponent
    },
];
