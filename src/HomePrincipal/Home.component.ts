import { Component } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterOutlet } from "@angular/router";
import { FigureComponent } from "../app/shared/banner/figure/figure.component";
import { RodapeComponent } from "../app/shared/footer/rodape/rodape.component";

@Component({
    selector:"app-home",
    standalone:true,
    imports:[RouterOutlet,FigureComponent,RodapeComponent,MatSnackBarModule],
    templateUrl:"./Home.component.html",
    styleUrl:"./Home.component.scss"
})
export class HomeComponent{}